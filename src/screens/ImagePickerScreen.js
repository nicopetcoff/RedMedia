import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
  Switch,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {publishPost, getUserData} from '../controller/miApp.controller'; // Mantener las importaciones necesarias
import {useUserContext} from '../context/AuthProvider';
import {useFocusEffect} from '@react-navigation/native';
import {useToggleMode} from '../context/ThemeContext'; // Asegurarse de importar el contexto de tema

Geocoder.init('AIzaSyAWjptknqVfMwmLDOiN5sBOoP5Rx2sxiSc');

const ImagePickerScreen = ({navigation}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Loading current location...');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isVideo, setIsVideo] = useState(false);

  const {colors} = useToggleMode(); // Mantener la lógica de los colores

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const deleteLocation = () => setSelectedLocation('');

  const {token} = useUserContext();

  const fetchUserData = async () => {
    try {
      const response = await getUserData(token);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (token) {
        fetchUserData();
      }
    }, [token]),
  );

  const toggleMediaType = () => {
    setIsVideo(!isVideo); // Cambia el estado entre video y foto
  };

  const openCamera = () => {
    launchCamera(
      {
        mediaType: isVideo ? 'video' : 'photo', // Cambia entre foto y video
        videoQuality: 'high', // Opcional: calidad del video
        saveToPhotos: true, // Si deseas guardar en la galería
      },
      response => {
        if (response.didCancel) {
        } else if (response.errorCode) {
        } else if (response.assets) {
          const newMedia = response.assets.map(asset => ({
            id: asset.uri, // Usar URI como identificador único
            uri: asset.uri,
            type: asset.type, // Guardar el tipo de archivo (foto/video)
          }));
          // Agregar la nueva imagen/video a selectedImages
          setSelectedImages(prev => [...prev, ...newMedia].slice(0, 10));
        }
      },
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'ios') return true; // iOS no requiere estos permisos explícitos

    try {
      // Solicitar permiso para la cámara
      const cameraGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take photos.',
        },
      );

      // Si usas Android 13 o superior, también puedes necesitar este permiso:
      if (Platform.Version >= 33) {
        const mediaImagesGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'Media Permission',
            message: 'This app needs access to your media to select images.',
          },
        );
        return (
          cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
          mediaImagesGranted === PermissionsAndroid.RESULTS.GRANTED
        );
      }

      return cameraGranted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          setLocation('Location permission denied');
          return;
        }

        Geolocation.getCurrentPosition(
          async position => {
            const {latitude, longitude} = position.coords;
            try {
              const response = await Geocoder.from(latitude, longitude);

              // Filtrar los componentes que queremos (locality, administrative_area_level_1, country)
              const addressComponents = response.results[0].address_components;
              let city = '';
              let state = '';
              let country = '';

              // Buscar los componentes de la dirección que nos interesan
              addressComponents.forEach(component => {
                if (component.types.includes('locality')) {
                  city = component.long_name;
                }
                if (component.types.includes('administrative_area_level_1')) {
                  state = component.long_name;
                }
                if (component.types.includes('country')) {
                  country = component.long_name;
                }
              });

              // Crear la dirección formateada: "City, State, Country"
              const formattedAddress = `${city}, ${state}, ${country}`;
              setLocation(formattedAddress);
              setSelectedLocation(formattedAddress);
            } catch (error) {
              setLocation('Error getting location details');
            }
          },
          error => {
            setLocation('Error getting location');
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      } catch (error) {
        setLocation('Error requesting location permission');
      }
    };

    getCurrentLocation();
  }, []);

  const openGallery = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'Permission to access gallery is required!',
        );
        return;
      }

      if (selectedImages.length >= 10) {
        Alert.alert('Limit Reached', 'You can only add up to 10 items.');
        return;
      }

      const options = {
        mediaType: 'mixed', // Permitir imágenes y videos
        selectionLimit: 10 - selectedImages.length,
      };

      const result = await launchImageLibrary(options);

      if (!result.didCancel && result.assets) {
        const newMedia = result.assets.map(asset => ({
          id: asset.uri,
          uri: asset.uri,
          type: asset.type, // Guardar el tipo de archivo (photo/video)
        }));
        setSelectedImages(prev => [...prev, ...newMedia].slice(0, 10));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick media');
    }
  };

  const removeImage = id => {
    setSelectedImages(selectedImages.filter(image => image.id !== id));
  };

  const handlePush = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    if (selectedImages.length === 0) {
      Alert.alert('Error', 'Please select at least one image or video');
      return;
    }

    if (!userData) {
      Alert.alert('Error', 'User data not available');
      return;
    }

    setLoading(true);

    try {
      // Preparamos el objeto de datos del post
      const postData = {
        title: title.trim(),
        description: description.trim(),
        location: selectedLocation,
        // Aquí, estamos pasando tanto imágenes como videos en el array
        media: selectedImages.map(item => item.uri), // Solo enviamos las URIs de las imágenes y videos
        user: userData.usernickname,
        userAvatar: userData.avatar,
      };

      // Llamamos a la función publishPost pasándole los datos
      const result = await publishPost(postData, token);

      if (result.success) {
        Alert.alert('Success', 'Post published successfully', [
          {
            text: 'OK',
            onPress: () => {
              // Limpiamos los campos después de la publicación exitosa
              setTitle('');
              setDescription('');
              setSelectedImages([]);
              setSelectedLocation('');
              navigation.goBack();
            },
          },
        ]);
      } else {
        Alert.alert('Error', result.message || 'Failed to publish post');
      }
    } catch (error) {
      console.error('Error en handlePush:', error);
      Alert.alert('Error', 'Failed to publish post');
    } finally {
      setLoading(false);
    }
  };

  const isPublishDisabled =
    !title.trim() || selectedImages.length === 0 || loading;

  return (
    <ScrollView contentContainerStyle={[styles.container,{backgroundColor:colors.background}]}>
      <View style={styles.header}>
        <Text></Text>
        <TouchableOpacity onPress={handlePush} disabled={isPublishDisabled}>
          <Text
            style={[
              styles.publishText,
              isPublishDisabled && styles.publishTextDisabled,
            ]}>
            {loading ? 'Publishing...' : 'Push'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={{
            uri:
              userData?.avatar ||
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
          }}
          style={styles.profileImage}
        />
        <Text style={[styles.username,{color:colors.text}]}>
          @{userData?.usernickname || 'Loading...'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={openGallery}
          style={[
            styles.selectButton,
            selectedImages.length >= 10 && styles.selectButtonDisabled,
          ]}
          disabled={selectedImages.length >= 10}>
          <Text style={styles.selectButtonText}>
            {selectedImages.length >= 10
              ? 'Maximum items selected'
              : 'Open Gallery'}
          </Text>
        </TouchableOpacity>

        {/* Botón para tomar foto o grabar video */}
        <TouchableOpacity
          onPress={openCamera}
          style={[
            styles.selectButton,
            selectedImages.length >= 10 && styles.selectButtonDisabled,
          ]}
          disabled={selectedImages.length >= 10}>
          <Text style={styles.selectButtonText}>
            {selectedImages.length >= 10
              ? 'Maximum items selected'
              : isVideo
              ? 'Record Video'
              : 'Take Photo'}
          </Text>
        </TouchableOpacity>

        {/* Componente Switch para alternar entre modo foto o video */}
        <View>
          <Text style={styles.switchText}>{isVideo ? 'Photo' : 'Video'}</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isVideo ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            value={isVideo}
            onValueChange={toggleMediaType} // Cambiar el estado de isVideo
            disabled={selectedImages.length >= 10} // Deshabilitar el switch si ya se seleccionaron 10 imágenes
          />
        </View>
      </View>

      {selectedImages.length > 0 && (
        <FlatList
          data={selectedImages}
          keyExtractor={item => item.id}
          horizontal
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              {item.type.startsWith('video') ? (
                <Video
                  source={{uri: item.uri}}
                  style={styles.selectedImage}
                  controls // Controles para reproducir video
                  resizeMode="cover"
                />
              ) : (
                <Image source={{uri: item.uri}} style={styles.selectedImage} />
              )}
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage(item.id)}>
                <Text style={styles.removeImageText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.flatListContainer}
          showsHorizontalScrollIndicator={false}
        />
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.textTitles}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Write something..."
          value={title}
          onChangeText={setTitle}
          maxLength={60}
          editable={!loading}
        />
        <Text style={styles.characterCount}>{60 - title.length}</Text>

        <Text style={styles.textTitles}>Description</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Write something..."
          value={description}
          onChangeText={setDescription}
          maxLength={300}
          multiline
          editable={!loading}
        />
        <Text style={styles.characterCount}>{300 - description.length}</Text>

        <Text style={styles.textTitles}>Location</Text>
        <View style={styles.switchContainer}>
          <Text>Use Actual Location</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              deleteLocation();
              toggleSwitch();
            }}
            value={isEnabled}
          />
        </View>
        {isEnabled ? (
          <Text style={styles.locationText}>{location}</Text>
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Enter location"
            onChangeText={setSelectedLocation}
            editable={!loading}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  publishText: {
    color: '#007AFF',
    fontSize: 16,
    marginTop: 50,
  },
  publishTextDisabled: {
    color: '#999',
  },
  textTitles: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  selectButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  selectButtonDisabled: {
    backgroundColor: '#999',
  },
  selectButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  flatListContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  characterCount: {
    textAlign: 'right',
    color: '#999',
    marginBottom: 15,
    fontSize: 12,
  },
  locationPicker: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
});

export default ImagePickerScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView, PermissionsAndroid, Platform, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { publishPost } from './miApp.controller';

// Configura tu clave de API de Google Maps
Geocoder.init('AIzaSyAWjptknqVfMwmLDOiN5sBOoP5Rx2sxiSc'); // Reemplaza con tu clave de API

const ImagePickerScreen = () => {
  const [selectedImages, setSelectedImages] = useState([
    { id: '1', uri: 'https://i.pinimg.com/736x/44/b1/0c/44b10c08db645d8f4fc0075c63669e67.jpg' },
    { id: '2', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaB7ofgJGrfAXvfjxN8k__Wlwa0144-eit1Q&s' },
    { id: '3', uri: 'https://c.wallhere.com/photos/3e/f2/animals_kittens_cat_pink_baby_animals-148208.jpg!d' },
    { id: '4', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaB7ofgJGrfAXvfjxN8k__Wlwa0144-eit1Q&s' },
    { id: '5', uri: 'https://c.wallhere.com/photos/3e/f2/animals_kittens_cat_pink_baby_animals-148208.jpg!d' },
  ]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Loading current location...');
  const [selectedLocation, setSelectedLocation] = useState(''); // Nuevo estado para la ubicación seleccionada

  useEffect(() => {
    const getCurrentLocation = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Permission denied for location');
          setLocation('Permission denied');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          Geocoder.from(latitude, longitude)
            .then(json => {
              const addressComponents = json.results[0].address_components;
              let city = '';
              let state = '';
              let country = '';

              addressComponents.forEach(component => {
                if (component.types.includes("locality")) {
                  city = component.long_name;
                }
                if (component.types.includes("administrative_area_level_1")) {
                  state = component.short_name;  // short_name para obtener abreviación (ej. CA)
                }
                if (component.types.includes("country")) {
                  country = component.short_name; // short_name para obtener abreviación (ej. US)
                }
              });

              const formattedLocation = `${city}, ${state}, ${country}`;
              setLocation(formattedLocation || 'Location not found');
            })
            .catch(error => {
              console.warn(error);
              setLocation('Unknown location');
            });
        },
        (error) => {
          console.warn('Geolocation error:', error);
          setLocation('Location not available');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    getCurrentLocation();
  }, []);

  const openGallery = () => {
    // Verificar si ya se alcanzó el límite de 10 imágenes
    if (selectedImages.length >= 10) {
      alert('You can only add up to 10 images.');
      return;
    }
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 10 - selectedImages.length, // Limitar a las imágenes que faltan para completar 10
      },
      (response) => {
        if (response.assets) {
          // Filtrar solo las nuevas imágenes que se pueden agregar sin exceder el límite de 10
          const newImages = response.assets.map(asset => ({ id: asset.uri, uri: asset.uri }));
          const totalImages = [...selectedImages, ...newImages].slice(0, 10); // Limitar la lista a un máximo de 10
          setSelectedImages(totalImages);
        }
      }
    );
  };

  const removeImage = (id) => {
    setSelectedImages(selectedImages.filter(image => image.id !== id));
  };

  const handlePush = async () => {
    if (!title || !description || selectedImages.length === 0) {
      Alert.alert('Error', 'Please fill all fields and select at least one image');
      return;
    }

    const postData = {
      title,
      description,
      location: selectedLocation || location,
      images: selectedImages.map(image => image.uri),
    };

    const result = await publishPost(postData);  // Llama a publishPost desde el controlador

    if (result.success) {
      Alert.alert('Success', result.message);
    } else {
      Alert.alert('Error', result.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text> </Text>
        <TouchableOpacity onPress={handlePush} disabled={!(title && description && selectedImages.length)}>
          <Text style={styles.publishText}>Push</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image source={{ uri: 'https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm90byUyMGRlJTIwcGVyZmlsfGVufDB8fDB8fHww' }} style={styles.profileImage} />
        <Text style={styles.username}>@juan_perez</Text>
      </View>
      <View>
        <TouchableOpacity onPress={openGallery} style={styles.selectButton}>
          <Text style={styles.selectButtonText}>Open Gallery</Text>
        </TouchableOpacity> 
        <FlatList
          data={selectedImages}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.uri }} style={styles.selectedImage} />
              <TouchableOpacity style={styles.removeImageButton} onPress={() => removeImage(item.id)}>
                <Text style={styles.removeImageText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.flatListContainer}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textTitles}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Write something..."
          value={title}
          onChangeText={(text) => setTitle(text)}
          maxLength={60}
        />
        <Text style={styles.characterCount}>{180 - title.length}</Text>
        <Text style={styles.textTitles}>Description</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Write something..."
          value={description}
          onChangeText={(text) => setDescription(text)}
          maxLength={300}
          multiline
        />
        <Text style={styles.characterCount}>{400 - description.length}</Text>
        <Text style={styles.textTitles}>Location</Text>
        <Picker
          selectedValue={selectedLocation}
          style={styles.locationPicker}
          onValueChange={(itemValue) => setSelectedLocation(itemValue)}
        >
          <Picker.Item label={location} value={location} style={styles.input} />
          <Picker.Item label="Quilmes" value="change" style={styles.input}/>
          {/* Puedes agregar más opciones de ubicación aquí */}
        </Picker>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
  },
  publishText: {
    color: '#007AFF',
    fontSize: 16,
  },
  textTitles: {
    color: "#000000",
    fontWeight: 'bold',
    marginBottom: 10,
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
    backgroundColor: '#FF0000',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  flatListContainer: {
    paddingVertical: 8,
  },
  inputContainer: {
    marginTop: 20,
    },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 17,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
    fontSize: 17,
  },
  locationPicker: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  selectButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  selectButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  imageScroll: {
    flexDirection: 'row',
  },
  imageWrapper: {
    width: 300, // Ajusta el ancho del contenedor de imagen
    height: 300, // Ajusta la altura del contenedor de imagen
    margin: 5,
    position: 'relative',
  },
  image: {
    width: '100%', // Asegúrate de que ocupe el ancho completo del contenedor
    height: '100%', // Asegúrate de que ocupe el alto completo del contenedor
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 50,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 16,
  },
  characterCount: {
    color: 'gray',
     fontSize: 15,
     marginBottom: 8,
  },
});

export default ImagePickerScreen;

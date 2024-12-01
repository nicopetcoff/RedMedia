import React, { useState, useEffect, useCallback } from 'react';
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
import { launchImageLibrary } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { publishPost, getUserData } from '../controller/miApp.controller';
import { useUserContext } from '../context/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import { useToggleMode } from '../context/ThemeContext';

Geocoder.init('AIzaSyAWjptknqVfMwmLDOiN5sBOoP5Rx2sxiSc'); // Reemplaza con tu API Key.

const ImagePickerScreen = ({ navigation }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Loading current location...');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const { colors } = useToggleMode();

  const toggleSwitch = () => setIsEnabled((prev) => !prev);
  const deleteLocation = () => setSelectedLocation('');
  const { token } = useUserContext();

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
    }, [token])
  );

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to show your current position.',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return false;
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
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await Geocoder.from(latitude, longitude);
              const address = response.results[0].formatted_address || 'Location not found';
              setLocation(address);
              setSelectedLocation(address);
            } catch (error) {
              setLocation('Error getting location details');
            }
          },
          (error) => {
            setLocation('Error getting location');
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          }
        );
      } catch (error) {
        setLocation('Error requesting location permission');
      }
    };

    getCurrentLocation();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'ios') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Photo Permission',
          message: 'This app needs access to your photos to upload images.',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const openGallery = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Permission to access gallery is required!');
        return;
      }

      if (selectedImages.length >= 10) {
        Alert.alert('Limit Reached', 'You can only add up to 10 images.');
        return;
      }

      const options = {
        mediaType: 'photo',
        selectionLimit: 10 - selectedImages.length,
      };

      const result = await launchImageLibrary(options);

      if (!result.didCancel && result.assets) {
        const newImages = result.assets.map((asset) => ({
          id: asset.uri,
          uri: asset.uri,
        }));
        setSelectedImages((prev) => [...prev, ...newImages].slice(0, 10));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const removeImage = (id) => {
    setSelectedImages(selectedImages.filter((image) => image.id !== id));
  };

  const handlePush = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    if (selectedImages.length === 0) {
      Alert.alert('Error', 'Please select at least one image');
      return;
    }

    if (!userData) {
      Alert.alert('Error', 'User data not available');
      return;
    }

    setLoading(true);

    try {
      const postData = {
        title,
        description,
        location: selectedLocation,
        images: selectedImages.map((image) => image.uri),
        user: userData.usernickname,
        userAvatar: userData.avatar,
      };

      const result = await publishPost(postData, token);

      if (result.success) {
        Alert.alert('Success', 'Post published successfully', [
          {
            text: 'OK',
            onPress: () => {
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
      Alert.alert('Error', 'Failed to publish post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container,{backgroundColor:colors.background}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePush} disabled={!title.trim() || selectedImages.length === 0 || loading}>
          <Text style={[styles.publishText, (!title.trim() || selectedImages.length === 0 || loading) && styles.disabledText]}>
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
      <TouchableOpacity
        onPress={openGallery}
        style={[
          styles.selectButton,
          selectedImages.length >= 10 && styles.selectButtonDisabled,
        ]}
        disabled={selectedImages.length >= 10}>
        <Text style={styles.selectButtonText}>
          {selectedImages.length >= 10
            ? 'Maximum images selected'
            : 'Open Gallery'}
        </Text>
      </TouchableOpacity>
      {selectedImages.length > 0 && (
        <FlatList
          data={selectedImages}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.uri }} style={styles.selectedImage} />
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
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
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
  goBackText: {
    fontSize: 16,
    color: '#007AFF',
  },
  publishText: {
    fontSize: 16,
    color: '#007AFF',
  },
  disabledText: {
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
  locationText: {
    padding: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    color: '#666',
  },
});

export default ImagePickerScreen;
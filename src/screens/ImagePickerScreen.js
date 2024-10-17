import React, { useState } from 'react';
import { View, Text, Button, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ImagePickerScreen = ({ navigation }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
      if (response.assets) {
        setSelectedImages([...selectedImages, ...response.assets]);
      }
    });
  };

  const removeImage = (uri) => {
    setSelectedImages(selectedImages.filter(image => image.uri !== uri));
  };

  return (
    <View style={styles.container}>
      <Button title="Seleccionar Imágenes" onPress={openGallery} />

      <FlatList
        data={selectedImages}
        keyExtractor={item => item.uri}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <TouchableOpacity onPress={() => removeImage(item.uri)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Button
        title="Siguiente"
        onPress={() => navigation.navigate('CreatePostScreen', { selectedImages })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginRight: 10,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 50,
    padding: 5,
  },
  removeButtonText: {
    color: '#fff',
  },
});

export default ImagePickerScreen;

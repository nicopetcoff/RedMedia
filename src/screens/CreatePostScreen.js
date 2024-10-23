import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CreatePostScreen = ({ navigation }) => {
  const [selectedImages, setSelectedImages] = useState([
    { id: '1', uri: 'https://i.pinimg.com/736x/44/b1/0c/44b10c08db645d8f4fc0075c63669e67.jpg' },
    { id: '2', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaB7ofgJGrfAXvfjxN8k__Wlwa0144-eit1Q&s' },
    { id: '3', uri: 'https://c.wallhere.com/photos/3e/f2/animals_kittens_cat_pink_baby_animals-148208.jpg!d' },
  ]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Quilmes');

  const removeImage = (id) => {
    setSelectedImages(selectedImages.filter(image => image.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity disabled={!(title && description)}>
          <Text style={styles.publishText}>Push</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image source={{ uri: 'https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm90byUyMGRlJTIwcGVyZmlsfGVufDB8fDB8fHww' }} style={styles.profileImage} />
        <Text style={styles.username}>@juan_perez</Text>
      </View>
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          maxLength={180}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          maxLength={360}
          multiline
        />
        <View style={styles.locationPicker}>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue) => setLocation(itemValue)}
          >
            <Picker.Item label="Quilmes" value="Quilmes" />
            <Picker.Item label="Buenos Aires" value="Buenos Aires" />
            <Picker.Item label="Córdoba" value="Córdoba" />
          </Picker>
        </View>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  publishText: {
    color: '#007AFF',
    fontSize: 16,
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
    width: 100,
    height: 100,
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
    marginBottom: 400, // Aumenta la separación del margen inferior
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  locationPicker: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 8,
  },
});

export default CreatePostScreen;

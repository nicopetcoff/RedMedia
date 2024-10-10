import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PostDetail = ({ route }) => {
  const { item } = route.params; // Recibe el post a través de las rutas

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      {/* Verificamos si el item tiene un array de imágenes */}
      <FlatList
        data={Array.isArray(item.image) ? item.image : [item.image]} // Aseguramos que siempre sea un array
        renderItem={renderImage}
        keyExtractor={(image, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.user}>{item.user}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: width - 40, // Ajustamos la imagen para que ocupe el ancho disponible
    height: 300,
    borderRadius: 10,
    marginHorizontal: 10, // Añadimos margen para espacio entre las imágenes
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  user: {
    fontSize: 18,
    color: '#555',
  }
});

export default PostDetail;
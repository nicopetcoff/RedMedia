import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Post = ({ item }) => {
  const navigation = useNavigation();

  // Verificamos si item.image es un array, si lo es, tomamos el primer elemento.
  const imageUri = Array.isArray(item.image) ? item.image[0] : item.image;

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PostDetail', { item })}>
      <Image source={{ uri: imageUri }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.user}>{item.user}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1, // Mantenemos la relación de aspecto
    borderRadius: 10,
    resizeMode: 'cover', // Aseguramos que la imagen mantenga su proporción
  },
  infoContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  user: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default Post;
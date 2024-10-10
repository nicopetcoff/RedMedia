import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Post = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PostDetail', { item })}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      {/*
      {item.sold && (
        <View style={styles.soldTag}>
          <Text style={styles.soldText}>Sold</Text>
        </View>
      )}
      */} 
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.user}>{item.user}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5, // Más margen horizontal para espaciado entre columnas
    width: '47%',  // Ajusta a 47% para evitar que las tarjetas se amontonen
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover', // Asegura que las imágenes se ajusten bien sin deformarse
  },
  infoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  user: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },
  soldTag: {
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -25 }],
  },
  soldText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default Post;
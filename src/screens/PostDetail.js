// src/screens/PostDetail.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PostDetail = ({ route }) => {
  const { item } = route.params; // Recibe el post a través de las rutas

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
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
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  user: {
    fontSize: 18,
    color: '#555',
  }
});

export default PostDetail;
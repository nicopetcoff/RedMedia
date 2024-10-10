// src/components/Post.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Post = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { item })}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        {item.sold && (
          <TouchableOpacity style={styles.soldTag}>
            <Text style={styles.soldText}>Sold</Text>
          </TouchableOpacity>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.user}>{item.user}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '48%',
    position: 'relative', 
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  user: {
    fontSize: 12,
    color: '#aaa',
  },
  soldTag: {
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  soldText: {
    color: '#fff',
    fontSize: 12,
  }
});

export default Post;
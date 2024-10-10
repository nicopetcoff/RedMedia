// src/components/ItemCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ItemCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      {item.sold && (
        <TouchableOpacity style={styles.soldTag}>
          <Text style={styles.soldText}>Sold</Text>
        </TouchableOpacity>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        {item.price ? <Text style={styles.price}>{item.price}</Text> : <Text style={styles.user}>{item.user}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '48%',
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
  price: {
    fontSize: 16,
    color: '#000',
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
    top: 10,
    left: 10,
  },
  soldText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default ItemCard;
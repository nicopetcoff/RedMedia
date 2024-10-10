// src/components/Footer.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Icon name="home-outline" size={30} color="black" />
      <Icon name="search-outline" size={30} color="black" />
      <Icon name="add-circle-outline" size={30} color="black" />
      <Icon name="heart-outline" size={30} color="black" />
      <Icon name="person-outline" size={30} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff', 
  },
});

export default Footer;
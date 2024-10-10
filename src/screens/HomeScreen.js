import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import Post from '../components/Post';
import posts from '../data/posts.json';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.header}>REDMEDIA</Text>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false} // Ocultar el indicador de scroll vertical para una experiencia más limpia
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left', // Cambiado a 'left' para alinear a la izquierda
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
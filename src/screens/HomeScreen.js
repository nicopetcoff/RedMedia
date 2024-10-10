import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Post from '../components/Post'; // Importamos el componente Post
import posts from '../data/posts.json'; // Importamos el JSON con los datos

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>REDMEDIA</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 20,
    color: 'black',
  },
  row: {
    justifyContent: 'space-between', // Espaciado entre las columnas
  },
});

export default HomeScreen;
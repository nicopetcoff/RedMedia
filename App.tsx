// App.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ItemCard from './src/components/ItemCard';
import Footer from './src/components/Footer';
import posts from './src/data/posts.json'; // Importamos el JSON

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>REDMEDIA</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => <ItemCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      <Footer />
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
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default App;
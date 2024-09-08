import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Usa el paquete correcto de Ionicons

const items = [
  {
    id: '1',
    image: 'https://via.placeholder.com/150',
    title: 'Água FRIZE C/ Gás Limão 0,25L',
    price: '€0,59',
    sold: true,
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/150',
    title: 'Lorem Ipsum, dolor sit amet consectetuer',
    user: '@user_nickname',
    price: '',
    sold: false,
  },
];

const App = () => {
  const renderItem = ({ item }) => (
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>REDMEDIA</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      <View style={styles.footer}>
        <Icon name="home-outline" size={30} color="black" />
        <Icon name="search-outline" size={30} color="black" />
        <Icon name="add-circle-outline" size={30} color="black" />
        <Icon name="heart-outline" size={30} color="black" />
        <Icon name="person-outline" size={30} color="black" />
      </View>
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});

export default App;

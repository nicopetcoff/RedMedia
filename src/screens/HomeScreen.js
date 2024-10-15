import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Post from '../components/Post';
import { getPosts } from '../controller/miApp.controller'; // Asegúrate de importar correctamente la función
import { useNavigation } from '@react-navigation/native'; // Importamos el hook de navegación

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Obtenemos el objeto de navegación

  // Función para obtener los posts
  const fetchPosts = async () => {
    setLoading(true); // Mostrar el spinner mientras cargan los posts
    try {
      const data = await getPosts(); // Llamada a la función para obtener los posts
      setPosts(data.data); // Asegúrate de acceder al campo 'data' de la respuesta
    } catch (error) {
      console.error("Error al cargar los posts", error);
    }
    setLoading(false); // Ocultar el spinner cuando termine la carga
  };

  useEffect(() => {
    fetchPosts(); // Cargar los posts cuando la pantalla se monte

    const unsubscribe = navigation.addListener('focus', () => {
      // Vuelve a cargar los posts cada vez que la pantalla "Home" sea enfocada
      fetchPosts();
    });

    return unsubscribe; // Limpiar el listener cuando el componente se desmonte
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.header}>REDMEDIA</Text>
      </View>
      <FlatList
        data={posts}  // Usamos los posts obtenidos del backend
        renderItem={({ item }) => <Post item={item} />}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false} // Ocultar el indicador de scroll vertical
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
    textAlign: 'left',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
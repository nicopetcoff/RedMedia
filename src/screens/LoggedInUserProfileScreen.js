// src/screens/LoggedInUserProfileScreen.js
import React from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import MyProfileHeader from '../components/MyProfileHeader';
import Post from '../components/Post';
import posts from '../data/MyPosts'; // Importamos el archivo JSON con los datos de los posts
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/authSlice'; // Importamos la acción signOut
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoggedInUserProfileScreen = () => {
  const dispatch = useDispatch();

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken'); // Eliminamos el token del AsyncStorage
    dispatch(signOut()); // Disparamos la acción signOut
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post item={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <>
            <MyProfileHeader />
            {/* Botón de Cerrar Sesión */}
            <View style={styles.logoutButtonContainer}>
              <Button title="Cerrar Sesión" onPress={handleLogout} color="#FF3B30" />
            </View>
          </>
        }
        showsVerticalScrollIndicator={false} // Ocultar el indicador de scroll vertical
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  logoutButtonContainer: {
    marginVertical: 20, // Espacio alrededor del botón
    paddingHorizontal: 20, // Padding para que no esté pegado a los bordes
  },
});

export default LoggedInUserProfileScreen;
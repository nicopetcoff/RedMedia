import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MyData from '../data/MyData.json'; // Importamos el archivo JSON con los datos del usuario

const MyProfileHeader = () => {
  const {width: windowWidth} = Dimensions.get('window'); // Obtener el ancho de la ventana

  // Verificación explícita de que los valores followers y following existen y son números válidos
  const followersCount =
    typeof MyData.followers === 'number' ? MyData.followers : 0;
  const followingCount =
    typeof MyData.following === 'number' ? MyData.following : 0;

    const handleEditPress = () => {
      console.log('Editar');
    };
  
    const handleSavedPress = () => {
      console.log('Guardados');
    };
  

  return (
    <View style={styles.container}>
      {/* Imagen de fondo */}
      {MyData.coverImage && (
        <Image
          source={{uri: MyData.coverImage}}
          style={[styles.coverImage, {width: windowWidth}]} // Ajustamos el ancho de la imagen al de la pantalla
          resizeMode="cover" // Aseguramos que la imagen cubra todo el área del cover
        />
      )}

      {/* Información del perfil */}
      <View style={styles.profileInfoContainer}>
        <View style={styles.MyDataSection}>
          <View style={styles.buttonAllign}>
            {/* Avatar */}
            {MyData.avatar && (
              <Image source={{uri: MyData.avatar}} style={styles.avatar} />
            )}
            {/* Botón de editar */}
            <TouchableOpacity
              style={styles.edit}
              onPress={handleEditPress}>
              <Text style={styles.editButtonText}> Editar
              </Text>
            </TouchableOpacity>
          </View>
          {/* Nombre y username debajo del avatar */}
          <View style={styles.MyDataDetails}>
            <View>
              {MyData.name && <Text style={styles.name}>{MyData.name}</Text>}
              {MyData.username && (
                <Text style={styles.MyDataname}>{MyData.username}</Text>
              )}
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statText}>{MyData.postsCount || 0}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statText}>{followersCount}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statText}>{followingCount}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {MyData.bio && <Text style={styles.bio}>{MyData.bio}</Text>}
      <View style={styles.buttonAllign}> 
        {MyData.level && <Text style={styles.level}>Nivel: {MyData.level}</Text>}
        <TouchableOpacity onPress={handleSavedPress}>
          <Image source={require('../assets/imgs/guardar.png')} style={{width: 24, height: 24, marginRight: 20}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  coverImage: {
    height: 120, // Altura fija de la imagen de fondo
    width: '100%', // Aseguramos que ocupe todo el ancho de la pantalla
  },
  profileInfoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -30,
    alignItems: 'center',
  },
  MyDataSection: {
    flexDirection: 'column',
  },
  buttonAllign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  MyDataDetails: {
    marginTop: 10,
    flexDirection: 'row',
  },
  name: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
  },
  MyDataname: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: 'gray',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '80%',
  },
  statItem: {
    marginRight: 20,
  },
  statText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  bio: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'left',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  level: {
    fontSize: 14,
    color: 'black',
    marginLeft: 20,
    marginBottom: 10,
  },
  edit: {
    backgroundColor: '#1FA1FF',
    borderRadius: 8,
    width: 124,
    height: 35,
    marginTop: 15,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'semi-bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
    lineHeight: 30,
  },
  postsContainer: {
    paddingBottom: 30, // Espacio al final para evitar superposición
  },
  columnWrapper: {
    justifyContent: 'space-between', // Asegura que los dos posts se distribuyan correctamente
    marginBottom: 10, // Espacio entre filas de posts
  },
});

export default MyProfileHeader;

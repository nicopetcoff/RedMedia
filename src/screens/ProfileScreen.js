import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import usersData from '../data/users.json'; // Importamos el archivo JSON con los usuarios

const ProfileScreen = ({ route }) => {
  const { username } = route.params || {}; // Recibimos el 'username' desde la navegación

  const [user, setUser] = useState(null); // Estado para almacenar el usuario encontrado
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Buscamos el usuario por 'username'
    const foundUser = usersData.find((u) => u.username === username);
    if (foundUser) {
      setUser(foundUser);
    }
  }, [username]);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagen de fondo */}
      {user.coverImage && (
        <Image 
          source={{ uri: user.coverImage }} 
          style={styles.coverImage} 
          resizeMode="cover" // Aseguramos que la imagen cubra todo el área del cover
        />
      )}

      {/* Información del perfil */}
      <View style={styles.profileContainer}>
        {user.avatar && <Image source={{ uri: user.avatar }} style={styles.avatar} />}
        {user.name && <Text style={styles.name}>{user.name}</Text>}
        {user.username && <Text style={styles.username}>@{user.username}</Text>}

        <View style={styles.statsContainer}>
          <Text style={styles.statText}>{user.postsCount || 0} Posts</Text>
          <Text style={styles.statText}>{user.followers || 0} Followers</Text>
          <Text style={styles.statText}>{user.following || 0} Following</Text>
        </View>

        {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
        {user.level && <Text style={styles.level}>Nivel: {user.level}</Text>}

        {/* Botón de seguir */}
        <TouchableOpacity style={styles.followButton} onPress={toggleFollow}>
          <Text style={styles.followButtonText}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  coverImage: {
    width: '100%',
    height: 200,  // Ajusta la altura de la imagen de fondo
  },
  profileContainer: {
    textAlign: 'left',
    textcolor: 'black',
    alignItems: 'flex-start',  // Alinea los elementos a la izquierda
    marginTop: -50,  // Ajusta la posición del avatar
    paddingHorizontal: 20, // Añade un padding general a la izquierda
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginLeft: 0, // Mueve el avatar hacia la izquierda
  },
  name: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5, // Reduce el espacio superior
    marginLeft: 10, // Mueve el nombre hacia la izquierda
  },
  username: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 3, // Reduce el espacio inferior
    marginLeft: 10, // Mueve el username hacia la izquierda
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 8,
    paddingHorizontal: 10, // Espacio a los lados para las estadísticas
  },
  statText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'left',
    marginHorizontal: 10, // Mueve la bio hacia la izquierda
    marginBottom: 1,  // Reduce el espacio inferior
    marginTop: 3,     // Mueve la bio más cerca del username
  },
  level: {
    fontSize: 14,
    color: 'black',
    marginVertical: 1,  // Reduce el margen superior e inferior
    marginLeft: 10, // Mueve el nivel hacia la izquierda
  },
  followButton: {
    backgroundColor: '#439CEE',
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 3,  // Reduce el espacio entre el nivel y el botón de seguir
    marginLeft: 10, // Mueve el botón de seguir hacia la izquierda
    height: 40,
    width: 300,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;
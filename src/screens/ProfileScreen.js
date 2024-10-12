import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import usersData from '../data/users.json'; // Importamos el archivo JSON con los usuarios
import Post from '../components/Post'; // Importamos el componente Post
import postsData from '../data/posts.json'; // Importamos los posts de prueba

const { width: windowWidth } = Dimensions.get('window'); // Obtener el ancho de la ventana

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

  // Filtramos los posts que pertenecen al usuario actual
  const userPosts = postsData.filter(post => post.user === user.username);

  // Verificación explícita de que los valores followers y following existen y son números válidos
  const followersCount = typeof user.followers === 'number' ? user.followers : 0;
  const followingCount = typeof user.following === 'number' ? user.following : 0;

  // Renderizado del encabezado del perfil
  const renderProfileHeader = () => (
    <View>
      {/* Imagen de fondo */}
      {user.coverImage && (
        <Image 
          source={{ uri: user.coverImage }} 
          style={[styles.coverImage, { width: windowWidth }]} // Ajustamos el ancho de la imagen al de la pantalla
          resizeMode="cover" // Aseguramos que la imagen cubra todo el área del cover
        />
      )}

      {/* Información del perfil */}
      <View style={styles.profileInfoContainer}>
        <View style={styles.userSection}>
          {/* Avatar */}
          {user.avatar && <Image source={{ uri: user.avatar }} style={styles.avatar} />}
          {/* Nombre y username debajo del avatar */}
          <View style={styles.userDetails}>
            {user.name && <Text style={styles.name}>{user.name}</Text>}
            {user.username && <Text style={styles.username}>@{user.username}</Text>}
          </View>
        </View>

        {/* Estadísticas a la derecha */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statText}>{userPosts.length || 0}</Text>
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

      {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
      {user.level && <Text style={styles.level}>Nivel: {user.level}</Text>}

      {/* Botón de seguir */}
      <TouchableOpacity style={styles.followButton} onPress={toggleFollow}>
        <Text style={styles.followButtonText}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={userPosts} // Usamos los posts filtrados del usuario
      renderItem={({ item }) => <Post item={item} />} // Usa el componente Post
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} // Mostramos 2 columnas
      columnWrapperStyle={styles.columnWrapper} // Estilo para las columnas
      ListHeaderComponent={renderProfileHeader} // Renderizamos el perfil como encabezado
      contentContainerStyle={styles.postsContainer} // Estilo para el contenedor de los posts
      showsVerticalScrollIndicator={false} // Ocultamos el indicador de scroll vertical
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
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
    height: 200, // Altura fija de la imagen de fondo
    width: '100%', // Aseguramos que ocupe todo el ancho de la pantalla
  },
  profileInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -30,
    alignItems: 'center',
  },
  userSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  userDetails: {
    marginTop: 10,
  },
  name: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  statItem: {
    marginLeft: 20,
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
  followButton: {
    backgroundColor: '#439CEE',
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  postsContainer: {
    paddingBottom: 30, // Espacio al final para evitar superposición
  },
  columnWrapper: {
    justifyContent: 'space-between', // Asegura que los dos posts se distribuyan correctamente
    marginBottom: 10, // Espacio entre filas de posts
  },
});

export default ProfileScreen;
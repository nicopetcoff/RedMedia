// src/screens/LoggedInUserProfileScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const LoggedInUserProfileScreen = () => {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario logueado

  useEffect(() => {
    // Aquí cargarías los datos del usuario logueado, por ejemplo desde AsyncStorage, API, etc.
    const loggedInUserData = {
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg', // URL del avatar
      coverImage: 'https://example.com/user-cover.jpg', // URL de la imagen de fondo
      name: 'John Doe',
      username: 'john_doe',
      bio: 'Desarrollador de software y apasionado de la tecnología.',
      level: 5,
      postsCount: 123,
      followers: 2000,
      following: 350,
    };
    setUser(loggedInUserData);
  }, []);

  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Loading user data...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user.coverImage && (
        <Image source={{ uri: user.coverImage }} style={styles.coverImage} resizeMode="cover" />
      )}

      <View style={styles.profileContainer}>
        {user.avatar && <Image source={{ uri: user.avatar }} style={styles.avatar} />}
        {user.name && <Text style={styles.name}>{user.name}</Text>}
        {user.username && <Text style={styles.username}>@{user.username}</Text>}

        <View style={styles.statsContainer}>
          <Text style={styles.statText}>{user.postsCount} Posts</Text>
          <Text style={styles.statText}>{user.followers} Followers</Text>
          <Text style={styles.statText}>{user.following} Following</Text>
        </View>

        {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
        {user.level && <Text style={styles.level}>Nivel: {user.level}</Text>}

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
    height: 200,
  },
  profileContainer: {
    alignItems: 'flex-start',
    marginTop: -50,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  username: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  statText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  level: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  followButton: {
    backgroundColor: '#439CEE',
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoggedInUserProfileScreen;
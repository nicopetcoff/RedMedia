// src/screens/LoggedInUserProfileScreen.js

import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import MyProfileHeader from '../components/MyProfileHeader';
import Post from '../components/Post';
import posts from '../data/MyPosts' // Importamos el archivo JSON con los datos de los posts

const LoggedInUserProfileScreen = () => {
  return (
    <View style={styles.container}>
      
      <FlatList
        data={posts}
        renderItem={({item}) => <Post item={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={<MyProfileHeader />} 
        showsVerticalScrollIndicator={false} // Ocultar el indicador de scroll vertical para una experiencia más limpia
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
});

export default LoggedInUserProfileScreen;

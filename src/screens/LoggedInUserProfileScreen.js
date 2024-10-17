import React from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import MyProfileHeader from '../components/MyProfileHeader';
import Post from '../components/Post';
import posts from '../data/MyPosts';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoggedInUserProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    dispatch(signOut());
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
            <View style={styles.logoutButtonContainer}>
              <Button title="Cerrar Sesión" onPress={handleLogout} color="#FF3B30" />
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
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
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});

export default LoggedInUserProfileScreen;
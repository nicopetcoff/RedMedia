import React, {useContext} from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import MyProfileHeader from '../components/MyProfileHeader';
import Post from '../components/Post';
import posts from '../data/MyPosts';
import { useToggleContext } from '../context/AuthProvider';

const LoggedInUserProfileScreen = () => {
  const {signOut} = useToggleContext()

  const handleLogout = async () => {
    signOut();
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
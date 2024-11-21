import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import MyProfileHeader from '../components/MyProfileHeader';
import Post from '../components/Post';
import {getPosts, getUserData} from '../controller/miApp.controller';
import {useUserContext} from '../context/AuthProvider';
import {useFocusEffect} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const COLUMN_WIDTH = (width - 30) / 2;

const LoggedInUserProfileScreen = () => {
  // 1. Todos los useState juntos al principio
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null);

  // 2. useContext después de useState
  const {token} = useUserContext();

  // 3. Definir todas las funciones con useCallback juntas
  const fetchUserData = useCallback(async () => {
    try {
      const data = await getUserData(token);
      setUserData(data.data);
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  }, [token]);

  const fetchUserPosts = useCallback(async () => {
    try {
      const data = await getPosts(); // Obtén todas las publicaciones
      

      // Filtrar las publicaciones que pertenecen al usuario actual
      const filteredPosts = data.data.filter(
        post => post.user === userData?.usernickname, // Compara con el nickname del usuario actual
      );

      setUserPosts(filteredPosts); // Guardar solo las publicaciones del usuario
    } catch (error) {
      console.error('Error al obtener posts:', error);
    }
  }, [userData?.usernickname]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchUserData(), userData && fetchUserPosts()]);
    } finally {
      setRefreshing(false);
    }
  }, [fetchUserData, fetchUserPosts, userData]);

  const renderPost = useCallback(
    ({item}) => (
      <View style={styles.postContainer}>
        <Post item={item} />
      </View>
    ),
    [],
  );

  const renderHeader = useCallback(() => (
    <MyProfileHeader
      userData={userData}
      userPostsCount={userPosts.length} // Pasamos el conteo al encabezado
    />
  ), [userData, userPosts]);

  // 4. useFocusEffect después de todas las definiciones de useCallback
  useFocusEffect(
    useCallback(() => {
      if (token) {
        setLoading(true);
        fetchUserData().finally(() => setLoading(false));
      }
    }, [token, fetchUserData]),
  );

  // 5. useEffect al final
  useEffect(() => {
    if (userData) {
      fetchUserPosts();
    }
  }, [userData, fetchUserPosts]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1FA1FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={userPosts}
        renderItem={renderPost}
        keyExtractor={item => item._id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#1FA1FF"
            colors={['#1FA1FF']}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  postContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default LoggedInUserProfileScreen;

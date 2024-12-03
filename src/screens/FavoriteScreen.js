import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {useUserContext} from '../context/AuthProvider';
import {getFavoritePosts, toggleLikePost} from '../controller/miApp.controller'; // Nueva función para manejar like
import Skeleton from '../components/Skeleton';
import Post from '../components/Post';

const FavoriteScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Inicializamos el estado de carga como true
  const [refreshing, setRefreshing] = useState(false);
  const {token} = useUserContext();
  const navigation = useNavigation();

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  const fetchFavoritePosts = useCallback(async () => {
    setLoading(true); // Activar el estado de carga

    try {
      const response = await getFavoritePosts(token);

      if (response?.data && Array.isArray(response.data)) {
        setPosts(response.data); // Si se obtienen posts, actualizamos el estado
      } else {
        setPosts([]); // Si no se obtienen posts, aseguramos que esté vacío
      }
    } catch (error) {
      console.error('Error al cargar los posts favoritos:', error);
      setPosts([]); // Si hay un error, mantenemos el estado de posts vacío
    } finally {
      setLoading(false); // Desactivamos el estado de carga
    }
  }, [token]);

  const handleLikePost = postId => {
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post._id === postId) {
          // Cambiar el estado del like del post
          const updatedPost = {
            ...post,
            likes: post.likes.includes(token)
              ? post.likes.filter(like => like !== token) // Si ya está dado el like, lo eliminamos
              : [...post.likes, token], // Si no está dado el like, lo agregamos
          };
          return updatedPost;
        }
        return post;
      });
    });

    // Realizar la actualización en el backend
    toggleLikePost(postId, token)
      .then(response => {})
      .catch(error => {
        console.error('Error al actualizar el like del post:', error);
      });
  };

  const refreshData = useCallback(async () => {
    if (refreshing || loading) {
      return; // Si ya estamos refrescando o cargando, no hacemos otra solicitud
    }

    setRefreshing(true); // Activamos el estado de refresco
    await fetchFavoritePosts(); // Recargamos los favoritos
    setRefreshing(false); // Desactivamos el estado de refresco
  }, [fetchFavoritePosts, refreshing, loading]);

  useEffect(() => {
    fetchFavoritePosts(); // Llamada inicial para cargar los posts favoritos cuando se monta el componente
  }, [fetchFavoritePosts]);

  const renderPost = useCallback(
    ({item}) => {
      if (!item?._id) return null;

      return (
        <View style={styles.postContainer}>
          <Post item={item} source="Favorite" onLikePost={handleLikePost} />
        </View>
      );
    },
    [handleLikePost],
  );

  const renderEmptyComponent = useCallback(() => {
    if (loading) {
      return (
        <View style={styles.skeletonContainer}>
          {[...Array(6)].map((_, index) => (
            <Skeleton key={`skeleton-${index}`} style={styles.skeleton} />
          ))}
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No has agregado posts a favoritos aún.
        </Text>
      </View>
    );
  }, [loading]);

  const renderFooter = useCallback(() => {
    if (loading) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color="#1DA1F2" />
        </View>
      );
    }
    return null;
  }, [loading]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {/* El logo fue eliminado aquí */}
          <Text style={styles.header}>Favoritos</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item, index) => `post-${item._id}-${index}`}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={[
            styles.listContent,
            posts.length === 0 && styles.emptyList,
          ]}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={refreshData} // Permitir el refresco de los datos
          ListEmptyComponent={renderEmptyComponent} // Mostrar mensaje vacío si no hay posts
          ListFooterComponent={renderFooter} // Mostrar footer con carga mientras esperamos la respuesta
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={Platform.OS === 'android'}
          updateCellsBatchingPeriod={50}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5, // Reducir el espacio del header
    paddingHorizontal: 15,
    borderBottomWidth: 0, // Eliminar la línea inferior del header
    backgroundColor: '#fff',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  header: {
    fontSize: 18, // Reducir el tamaño del texto del header
    fontWeight: 'bold',
    color: 'black',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  emptyList: {
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  postContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 15,
  },
  skeletonContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  skeleton: {
    width: '48%',
    height: 200,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 50,
    paddingHorizontal: 10,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default FavoriteScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LikeIcon from '../assets/like.svg';
import CommentIcon from '../assets/comentar.svg';
import Interest from '../assets/intereses.svg';
import Location from '../assets/location.svg';
import FilledLikeIcon from '../assets/filled_like.svg'; // Usamos un ícono lleno para el 'like' presionado

const { width } = Dimensions.get('window');

const PostDetail = ({ route }) => {
  const { item } = route.params || {}; // Recibe los datos de HomeScreen a través de route.params

  // Estado para gestionar el botón de follow/unfollow
  const [isFollowing, setIsFollowing] = useState(false);
  // Estado para gestionar el like
  const [isLiked, setIsLiked] = useState(false);
  // Estado para mostrar todos los comentarios
  const [showAllComments, setShowAllComments] = useState(false);

  // Verificación para asegurarnos de que los datos están disponibles antes de renderizar
  if (!item) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          No se encontraron detalles para este post.
        </Text>
      </View>
    );
  }

  // Renderiza la imagen o el carrusel de imágenes
  const renderImage = ({ item }) => {
    if (!item) {
      return null;
    }
    return <Image source={{ uri: item }} style={styles.image} />;
  };

  // Renderiza los comentarios
  const renderComments = () => {
    const commentsToDisplay = showAllComments ? item.comments : item.comments.slice(0, 2);
    
    return (
      <View style={styles.commentSection}>
        {item.comments && item.comments.length > 0 ? (
          commentsToDisplay.map((comment, index) => (
            <View key={index} style={styles.commentContainer}>
              <Text style={styles.commentUsername}>{comment.username}</Text>
              <Text style={styles.commentText}>{comment.comment}</Text>
            </View>
          ))
        ) : (
          <Text>No comments yet</Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          {item.userAvatar && (
            <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
          )}
          {item.user && (
            <View style={styles.userInfo}>
              <Text style={styles.username}>{item.user}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.followButton}
          onPress={() => setIsFollowing(!isFollowing)}
        >
          <Text style={styles.followButtonText}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        {item.title && <Text style={styles.title}>{item.title}</Text>}
      </View>

      {/* Si hay múltiples imágenes, se muestran en un carrusel */}
      {Array.isArray(item.image) ? (
        <FlatList
          data={item.image}
          renderItem={renderImage} // Solo renderiza si hay imagen
          keyExtractor={(image, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageCarousel}
        />
      ) : (
        item.image && <Image source={{ uri: item.image }} style={styles.image} /> // Solo renderiza si hay imagen
      )}

      {item.location && (
        <View style={styles.locationContainer}>
          <Location width={16} height={16} style={styles.icon} />
          <Text style={styles.location}>{item.location}</Text>
        </View>
      )}

      {/* Barra de interacción */}
      <View style={styles.interactionBar}>
        <View style={styles.leftIcons}>
          <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
            {isLiked ? (
              <FilledLikeIcon width={24} height={24} style={styles.icon} fill="red" />
            ) : (
              <LikeIcon width={24} height={24} style={styles.icon} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Comentar presionado')}>
            <CommentIcon width={24} height={24} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => console.log('Intereses presionado')}>
          <Interest width={24} height={24} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Línea debajo de la barra de interacción */}
      <View style={styles.line} />

      {/* Sección de likes y comentarios */}
      <View style={styles.likeSection}>
        <Text style={styles.likeText}>
          Liked by <Text style={styles.boldText}>{item.likes || 0}</Text>
        </Text>
      </View>

      {/* Renderizamos los comentarios */}
      {renderComments()}

      {/* Botón para mostrar todos los comentarios */}
      {item.comments && item.comments.length > 2 && (
        <TouchableOpacity onPress={() => setShowAllComments(!showAllComments)}>
          <Text style={styles.viewAllComments}>
            {showAllComments ? 'Hide comments' : 'View all comments'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
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
    color: '#f00',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',  // Aseguramos que el color no sea blanco
  },
  followButton: {
    backgroundColor: '#439CEE',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: 90,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButtonText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'Regular',
  },
  titleContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  location: {
    fontSize: 12,
    color: '#555',
  },
  image: {
    width: width - 40,
    height: 354,
    borderRadius: 44,
    marginHorizontal: 15,
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  leftIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 50,
    marginVertical: 5,
  },
  likeSection: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  likeText: {
    fontSize: 14,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  commentSection: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#333',  // Aseguramos que el color del username no sea blanco
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  viewAllComments: {
    color: '#888',
    marginTop: 5,
    paddingHorizontal: 15,
  },
});

export default PostDetail;
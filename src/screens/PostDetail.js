import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useUserContext } from '../context/AuthProvider';
import { getUserData, getUsers, interactWithPost, handleFollowUser } from '../controller/miApp.controller';
import PostHeader from '../components/PostHeader';
import PostImage from '../components/PostImage';
import PostInteractionBar from '../components/PostInteractionBar';
import PostComments from '../components/PostComments';
import LocationIcon from '../assets/imgs/location.svg';

const PostDetail = ({ route, navigation }) => {
  const { item, previousScreen, username, fromScreen } = route.params || {};
  const { token } = useUserContext();

  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [userData, setUserData] = useState(null);
  const [postUserData, setPostUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(item?.comments || []);

  const getCurrentUserId = () => {
    try {
      if (!token) return null;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload).id;
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [currentUserResponse, usersResponse] = await Promise.all([
        getUserData(token),
        getUsers(token),
      ]);

      setUserData(currentUserResponse.data);

      if (item?.user && usersResponse.data) {
        const foundUser = usersResponse.data.find(
          u => u.usernickname === item.user
        );
        if (foundUser) {
          const currentUserId = getCurrentUserId();
          const isCurrentUserFollowing = foundUser.followers?.includes(currentUserId);

          setPostUserData(foundUser);
          setIsFollowing(isCurrentUserFollowing);
        }
      }
    } catch (error) {
      console.error('Error al obtener datos de usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFollow = async () => {
    try {
      const newFollowState = !isFollowing;
      await handleFollowUser(postUserData._id, token, isFollowing);
      setIsFollowing(newFollowState);

      // Actualizar seguidores en el estado local
      setPostUserData(prev => ({
        ...prev,
        followers: newFollowState
          ? [...(prev.followers || []), getCurrentUserId()]
          : (prev.followers || []).filter(id => id !== getCurrentUserId()),
      }));
    } catch (error) {
      console.error('Error al seguir/dejar de seguir:', error);
    }
  };

  const handleLike = async () => {
    try {
      const action = isLiked ? 'unlike' : 'like';
      const response = await interactWithPost(item._id, token, action);
      setIsLiked(!isLiked);
      console.log('Post actualizado:', response.data);
    } catch (error) {
      console.error('Error al dar/quitar like:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      if (!newComment.trim()) return;

      const response = await interactWithPost(item._id, token, 'comment', newComment);
      setComments(response.data.comments); // Actualiza los comentarios desde el backend
      setNewComment('');
      setShowCommentInput(false);
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  useEffect(() => {
    if (token && item?.user) {
      fetchUserData();
    }
  }, [token, item]);

  useEffect(() => {
    if (item?.sold) {
      if (previousScreen === 'Profile') {
        navigation.navigate('Profile', {
          username,
          fromScreen: fromScreen || 'Home',
        });
      } else {
        navigation.goBack();
      }
    }
  }, [item, navigation, previousScreen, username, fromScreen]);

  if (!item || item.sold) {
    return null;
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1DA1F2" />
      </View>
    );
  }

  const isOwnPost = userData?.usernickname === item?.user;

  const handleUserPress = () => {
    if (!isOwnPost) {
      navigation.navigate('Profile', {
        username: item.user,
        fromScreen: previousScreen || 'Home',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={handleUserPress} disabled={isOwnPost}>
        <PostHeader
          userAvatar={isOwnPost ? userData?.avatar : postUserData?.avatar}
          user={item.user}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
          isOwnPost={isOwnPost}
          userId={postUserData?._id}
          onFollowChange={toggleFollow}
        />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        {item.title && <Text style={styles.title}>{item.title}</Text>}
        {item.description ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : (
          <Text style={styles.description}>Sin descripción</Text>
        )}
      </View>
      <PostImage images={item.image} />
      {item.location && (
        <View style={styles.locationContainer}>
          <LocationIcon width={16} height={16} />
          <Text style={styles.location}>{item.location}</Text>
        </View>
      )}
      <PostInteractionBar
        isLiked={isLiked}
        onLikePress={handleLike}
        onCommentPress={() => setShowCommentInput(!showCommentInput)}
      />
      <View style={styles.line} />
      <View style={styles.likeSection}>
        <Text style={styles.likeText}>
          Le gusta a <Text style={styles.boldText}>{item.likes || 0}</Text> personas
        </Text>
      </View>
      <PostComments comments={comments} />

      {showCommentInput && (
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Escribe un comentario..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  description: {
    fontSize: 13,
    color: '#555',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    marginTop: 4,
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
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  line: {
    height: 1,
    backgroundColor: '#E1E8ED',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  likeSection: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  likeText: {
    fontSize: 14,
    color: '#333',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  boldText: {
    fontWeight: 'bold',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PostDetail;
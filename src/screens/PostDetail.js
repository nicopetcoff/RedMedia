import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  Image,
} from 'react-native';
import {useUserContext} from '../context/AuthProvider';
import {
  getUserData,
  getUsers,
  interactWithPost,
  handleFollowUser,
} from '../controller/miApp.controller';
import PostHeader from '../components/PostHeader';
import PostMedia from '../components/PostMedia';
import PostInteractionBar from '../components/PostInteractionBar';
import PostComments from '../components/PostComments';
import LocationIcon from '../assets/imgs/location.svg';

const PostDetail = ({route, navigation}) => {
  const {item, previousScreen, username, fromScreen, updatePost} =
    route.params || {};
  const {token} = useUserContext();

  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    ...item,
    videos: item?.videos || [],
  });
  const [userData, setUserData] = useState(null);
  const [postUserData, setPostUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(item?.comments || []);

  const getCurrentUserId = useCallback(() => {
    try {
      if (!token) return null;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(jsonPayload).id;
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  }, [token]);

  const fetchUserData = useCallback(async () => {
    if (!token || !currentPost?.user) return;

    try {
      setLoading(true);
      const [currentUserResponse, usersResponse] = await Promise.all([
        getUserData(token),
        getUsers(token),
      ]);

      const currentUser = currentUserResponse.data;
      setUserData(currentUser);

      if (currentPost?.likes && Array.isArray(currentPost.likes)) {
        setIsLiked(currentPost.likes.includes(currentUser.usernickname));
      }

      const foundUser = usersResponse.data.find(
        u => u.usernickname === currentPost.user,
      );

      if (foundUser) {
        const currentUserId = getCurrentUserId();
        const isCurrentUserFollowing =
          foundUser.followers?.includes(currentUserId);
        setPostUserData(foundUser);
        setIsFollowing(isCurrentUserFollowing);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  }, [token, currentPost, getCurrentUserId]);

  useEffect(() => {
    if (token && currentPost?.user) {
      fetchUserData();
    }
  }, [token, currentPost?.user, fetchUserData]);

  useEffect(() => {
    if (item && item._id !== currentPost?._id) {
      setCurrentPost(JSON.parse(JSON.stringify(item)));
      setComments(item.comments || []);
    }
  }, [item?._id]);

  useEffect(() => {
    return () => {
      setCurrentPost(null);
      setUserData(null);
      setPostUserData(null);
      setComments([]);
    };
  }, []);

  const toggleFollow = async () => {
    if (!postUserData?._id) return;

    try {
      const newFollowState = !isFollowing;
      await handleFollowUser(postUserData._id, token, isFollowing);
      setIsFollowing(newFollowState);

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
    if (!currentPost?._id || !userData?.usernickname) return;

    const newLikeState = !isLiked;
    setIsLiked(newLikeState);

    setCurrentPost(prev => ({
      ...prev,
      likes: newLikeState
        ? [...(prev.likes || []), userData.usernickname]
        : (prev.likes || []).filter(like => like !== userData.usernickname),
    }));

    try {
      const response = await interactWithPost(currentPost._id, token, 'like');
      if (response.data) {
        setCurrentPost(response.data);
        if (updatePost) updatePost(response.data);
      }
    } catch (error) {
      setIsLiked(!newLikeState);
      setCurrentPost(prev => ({
        ...prev,
        likes: !newLikeState
          ? [...(prev.likes || []), userData.usernickname]
          : (prev.likes || []).filter(like => like !== userData.usernickname),
      }));
      console.error('Error al dar/quitar like:', error);
    }
  };

  const handleAddComment = async () => {
    if (!currentPost?._id || !newComment.trim() || !userData?.usernickname)
      return;

    const optimisticComment = {
      user: userData.usernickname,
      comment: newComment.trim(),
      createdAt: new Date().toISOString(),
      _id: Date.now().toString(),
    };

    setComments(prev => [...prev, optimisticComment]);
    setNewComment('');
    setShowCommentInput(false);

    try {
      const response = await interactWithPost(
        currentPost._id,
        token,
        'comment',
        newComment.trim(),
      );

      if (response.data) {
        setCurrentPost(response.data);
        setComments(response.data.comments);
        if (updatePost) updatePost(response.data);
      }
    } catch (error) {
      setComments(prev =>
        prev.filter(comment => comment._id !== optimisticComment._id),
      );
      console.error('Error al agregar comentario:', error);
    }
  };

  const handleUserPress = useCallback(() => {
    if (!isOwnPost && currentPost?.user) {
      navigation.push('Profile', {
        username: currentPost.user,
        fromScreen: previousScreen || 'Home',
        timestamp: Date.now(),
      });
    }
  }, [isOwnPost, currentPost?.user, navigation, previousScreen]);

  if (!currentPost) {
    return null;
  }

  if (loading && !userData && !postUserData) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1DA1F2" />
      </View>
    );
  }

  const isOwnPost = userData?.usernickname === currentPost.user;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={handleUserPress} disabled={isOwnPost}>
        <PostHeader
          userAvatar={isOwnPost ? userData?.avatar : postUserData?.avatar}
          user={currentPost.user}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
          isOwnPost={isOwnPost}
          userId={postUserData?._id}
          onFollowChange={toggleFollow}
        />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        {currentPost.title && (
          <Text style={styles.title}>{currentPost.title}</Text>
        )}
        {currentPost.description ? (
          <Text style={styles.description}>{currentPost.description}</Text>
        ) : (
          <Text style={styles.description}>Sin descripción</Text>
        )}
      </View>

      <PostMedia
        media={[
          ...(currentPost.image || []).map(img => ({type: 'image', url: img})),
          ...(currentPost.videos || []).map(vid => ({type: 'video', url: vid})),
        ]}
      />

      {currentPost.location && (
        <View style={styles.locationContainer}>
          <LocationIcon width={16} height={16} />
          <Text style={styles.location}>{currentPost.location}</Text>
        </View>
      )}

      <PostInteractionBar
        postId={currentPost?._id}
        isLiked={isLiked}
        onLikePress={handleLike}
        onCommentPress={() => setShowCommentInput(!showCommentInput)}
      />

      <View style={styles.line} />

      <View style={styles.likeSection}>
        <Text style={styles.likeText}>
          Le gusta a{' '}
          <Text style={styles.boldText}>{currentPost.likes?.length || 0}</Text>{' '}
          personas
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
            autoFocus
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !newComment.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleAddComment}
            disabled={!newComment.trim()}>
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
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default PostDetail;
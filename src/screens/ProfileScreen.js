import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import Post from '../components/Post';
import {
  getPosts,
  getUsers,
  handleFollowUser,
} from '../controller/miApp.controller';
import {useUserContext} from '../context/AuthProvider';

const {width: windowWidth} = Dimensions.get('window');

const ProfileScreen = ({route, navigation}) => {
  const {username, fromScreen} = route.params;
  const {token} = useUserContext();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentUserId = () => {
    try {
      if (!token) return null;
      // Decodificar el token manualmente
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
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!token) {
        setError('No token available');
        return;
      }

      const [usersResponse, postsResponse] = await Promise.all([
        getUsers(token),
        getPosts(),
      ]);

      const foundUser = usersResponse.data.find(
        u => u.usernickname === username,
      );

      if (!foundUser) {
        setError('Usuario no encontrado');
        return;
      }

      const currentUserId = getCurrentUserId();
      const isCurrentUserFollowing =
        foundUser.followers?.includes(currentUserId);

      setUser(foundUser);
      setIsFollowing(isCurrentUserFollowing);

      const userPosts = postsResponse.data.filter(
        post => post.user === username,
      );
      setUserPosts(userPosts);
    } catch (error) {
      console.error('Error loading user data:', error);
      setError('Error al cargar los datos del usuario');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [username, token]);

  const handleFollowPress = async () => {
    if (followLoading || !user?._id) {
      console.log(
        'Follow action blocked - loading:',
        followLoading,
        'userId:',
        user?._id,
      );
      return;
    }

    setFollowLoading(true);
    console.log('Attempting follow action for user:', user._id);

    try {
      const data = await handleFollowUser(user._id, token, isFollowing);

      console.log('Follow response:', data);

      if (data.status === 200) {
        const newFollowState = !isFollowing;
        setIsFollowing(newFollowState);

        // Actualizar el contador de seguidores
        setUser(prev => {
          const currentFollowers = Array.isArray(prev.followers)
            ? prev.followers
            : [];
          const currentUserId = getCurrentUserId();

          return {
            ...prev,
            followers: newFollowState
              ? [...currentFollowers, currentUserId]
              : currentFollowers.filter(id => id !== currentUserId),
          };
        });
      }
    } catch (error) {
      console.error('Error en follow action:', error);
      Alert.alert(
        'Error',
        'No se pudo completar la acción. Por favor, intenta de nuevo.',
      );
    } finally {
      setFollowLoading(false);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.postContainer}>
      <Post
        item={item}
        source="Profile"
        onPress={() =>
          navigation.navigate('PostDetail', {
            item,
            previousScreen: 'Profile',
            username: user.usernickname,
            fromScreen: 'Profile',
          })
        }
      />
    </View>
  );

  const renderProfileHeader = () => (
    <View>
      <Image
        source={{
          uri: user.coverImage || 'https://via.placeholder.com/500x150',
        }}
        style={[styles.coverImage, {width: windowWidth}]}
        resizeMode="cover"
      />

      <View style={styles.profileInfoContainer}>
        <View style={styles.userSection}>
          <Image
            source={{
              uri: user.avatar || 'https://via.placeholder.com/100x100',
            }}
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.name}>
              {user.nombre} {user.apellido}
            </Text>
            <Text style={styles.username}>@{user.usernickname}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statText}>{userPosts.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statText}>
              {user.followers ? user.followers.length : 0}
            </Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statText}>
              {user.following ? user.following.length : 0}
            </Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {user.bio && <Text style={styles.bio}>{user.bio}</Text>}

      {getCurrentUserId() !== user._id && (
        <TouchableOpacity
          style={[
            styles.followButton,
            isFollowing && styles.followingButton,
            followLoading && styles.disabledButton,
          ]}
          onPress={handleFollowPress}
          disabled={followLoading}>
          {followLoading ? (
            <ActivityIndicator
              size="small"
              color={isFollowing ? '#1DA1F2' : '#ffffff'}
            />
          ) : (
            <Text
              style={[
                styles.followButtonText,
                isFollowing && styles.followingButtonText,
              ]}>
              {isFollowing ? 'Siguiendo' : 'Seguir'}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1DA1F2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Usuario no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={userPosts}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderProfileHeader}
        contentContainerStyle={styles.postsContainer}
        showsVerticalScrollIndicator={false}
        onRefresh={fetchUserData}
        refreshing={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  coverImage: {
    height: 150,
    width: '100%',
  },
  profileInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -30,
    alignItems: 'flex-end',
  },
  userSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  userDetails: {
    marginTop: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  username: {
    fontSize: 14,
    color: '#657786',
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  bio: {
    fontSize: 14,
    color: '#14171A',
    marginHorizontal: 20,
    marginTop: 10,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: 'transparent',
  },
  statItem: {
    marginLeft: 20,
    alignItems: 'center',
  },
  statText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  statLabel: {
    fontSize: 12,
    color: '#657786',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  followButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginHorizontal: 20,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
  },
  followingButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1DA1F2',
  },
  followButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  followingButtonText: {
    color: '#1DA1F2',
  },
  postContainer: {
    flex: 1,
    maxWidth: '50%',
    padding: 5,
  },
  postsContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default ProfileScreen;

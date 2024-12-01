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
  Modal,
  ScrollView,
} from 'react-native';
import Post from '../components/Post';
import {
  getPosts,
  getUsers,
  handleFollowUser,
} from '../controller/miApp.controller';
import {useUserContext} from '../context/AuthProvider';
import { useToggleMode } from '../context/ThemeContext';

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
  const [followersData, setFollowersData] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);

  const { colors } = useToggleMode();

  const getCurrentUserId = () => {
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

      if (foundUser.followers && foundUser.followers.length > 0) {
        const followersInfo = foundUser.followers
          .map(followerId => {
            return usersResponse.data.find(u => u._id === followerId);
          })
          .filter(Boolean);
        setFollowersData(followersInfo);
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
    if (followLoading || !user?._id) return;

    setFollowLoading(true);
    try {
      const data = await handleFollowUser(user._id, token, isFollowing);

      if (data.status === 200) {
        const newFollowState = !isFollowing;
        setIsFollowing(newFollowState);

        setUser(prev => ({
          ...prev,
          followers: newFollowState
            ? [...(prev.followers || []), getCurrentUserId()]
            : (prev.followers || []).filter(id => id !== getCurrentUserId()),
        }));

        // Actualizar la lista de seguidores
        await fetchUserData();
      }
    } catch (error) {
      console.error('Error al seguir/dejar de seguir:', error);
    } finally {
      setFollowLoading(false);
    }
  };

  const FollowersModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showFollowers}
      onRequestClose={() => setShowFollowers(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Seguidores</Text>
            <TouchableOpacity onPress={() => setShowFollowers(false)}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.followersList}>
            {followersData.map(follower => (
              <TouchableOpacity
                key={follower._id}
                style={styles.followerItem}
                onPress={() => {
                  setShowFollowers(false);
                  navigation.navigate('Profile', {
                    username: follower.usernickname,
                    fromScreen: 'Profile',
                  });
                }}>
                <Image
                  source={{
                    uri: follower.avatar || 'https://via.placeholder.com/40',
                  }}
                  style={styles.followerAvatar}
                />
                <View style={styles.followerInfo}>
                  <Text style={styles.followerName}>
                    {follower.nombre} {follower.apellido}
                  </Text>
                  <Text style={styles.followerUsername}>
                    @{follower.usernickname}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
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
            <Text style={[styles.name,{color:colors.text}]}>
              {user.nombre} {user.apellido}
            </Text>
            <Text style={styles.username}>@{user.usernickname}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statText,{color:colors.text}]}>{userPosts.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() => setShowFollowers(true)}>
            <Text style={[styles.statText,{color:colors.text}]}>
              {user.followers ? user.followers.length : 0}
            </Text>
            <Text style={styles.statLabel}>Followers</Text>
          </TouchableOpacity>
          <View style={styles.statItem}>
            <Text style={[styles.statText,{color:colors.text}]}>
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
            followLoading && styles.disabledButton,{backgroundColor:colors.background}
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
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.loaderContainer,{backgroundColor:colors.post}]}>
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
    <View style={[styles.container,{backgroundColor:colors.background}]}>
      <FlatList
        data={userPosts}
        renderItem={({item}) => (
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
        )}
        keyExtractor={item => item._id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderProfileHeader}
        contentContainerStyle={styles.postsContainer}
        showsVerticalScrollIndicator={false}
        onRefresh={fetchUserData}
        refreshing={loading}
      />
      <FollowersModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  closeButton: {
    fontSize: 24,
    color: '#657786',
    padding: 5,
  },
  followersList: {
    padding: 15,
  },
  followerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  followerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  followerInfo: {
    marginLeft: 15,
  },
  followerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  followerUsername: {
    fontSize: 14,
    color: '#657786',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  shadowEffect: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default ProfileScreen;

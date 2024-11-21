import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useUserContext} from '../context/AuthProvider';
import {handleFollowUser} from '../controller/miApp.controller';

const PostHeader = ({
  userAvatar,
  user,
  isFollowing: initialIsFollowing,
  setIsFollowing: parentSetIsFollowing,
  isOwnPost,
  userId,
  onFollowChange,
}) => {
  const {token} = useUserContext();
  const [loading, setLoading] = useState(false);
  const [followState, setFollowState] = useState(initialIsFollowing);

  useEffect(() => {
    setFollowState(initialIsFollowing);
  }, [initialIsFollowing]);

  const handleFollowPress = async () => {
    if (loading || !userId) {
      return;
    }

    setLoading(true);

    try {
      const data = await handleFollowUser(userId, token, followState);

      if (data.status === 200) {
        const newFollowState = !followState;
        setFollowState(newFollowState);
        
        // Actualizar estado en el componente padre
        if (parentSetIsFollowing) parentSetIsFollowing(newFollowState);
        if (onFollowChange) onFollowChange(newFollowState);

        // Opcionalmente recargar los datos del usuario
        console.log('Follow state updated:', newFollowState);
      }
    } catch (error) {
      console.error('Error al seguir/dejar de seguir:', error);
      Alert.alert(
        'Error',
        'No se pudo completar la acción. Por favor, intenta de nuevo.'
      );
      setFollowState(followState); // Revertir estado en caso de error
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Image
          source={
            typeof userAvatar === 'string'
              ? {uri: userAvatar}
              : require('../assets/imgs/avatarDefault.jpg')
          }
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{user}</Text>
        </View>
      </View>
      {!isOwnPost && (
        <TouchableOpacity
          style={[
            styles.followButton,
            followState && styles.followingButton,
            loading && styles.disabledButton,
          ]}
          onPress={handleFollowPress}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator
              size="small"
              color={followState ? '#1DA1F2' : '#ffffff'}
            />
          ) : (
            <Text
              style={[
                styles.followButtonText,
                followState && styles.followingButtonText,
              ]}>
              {followState ? 'Siguiendo' : 'Seguir'}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Roboto',
  },
  followButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
  },
  followingButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1DA1F2',
  },
  followButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  followingButtonText: {
    color: '#1DA1F2',
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default PostHeader;
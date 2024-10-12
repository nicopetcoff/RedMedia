import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PostHeader = ({ userAvatar, user, isFollowing, setIsFollowing }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        {userAvatar && (
          <Image source={{ uri: userAvatar }} style={styles.avatar} />
        )}
        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.username}>{user}</Text>
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
  );
};

const styles = StyleSheet.create({
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
    color: '#333',
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
  },
});

export default PostHeader;
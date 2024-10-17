import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PostHeader from '../components/PostHeader';
import PostImage from '../components/PostImage';
import PostInteractionBar from '../components/PostInteractionBar';
import PostComments from '../components/PostComments';
import LocationIcon from '../assets/imgs/location.svg';

const PostDetail = ({ route, navigation }) => {
  const { item } = route.params || {};

  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (item?.sold) {
      navigation.goBack();
    }
  }, [item, navigation]);

  if (!item || item.sold) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Navegación al perfil del usuario al hacer clic en el avatar */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile', { username: item.user })}
      >
        <PostHeader
          userAvatar={item.userAvatar}
          user={item.user}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
        />
      </TouchableOpacity>
      
      <View style={styles.titleContainer}>
        {item.title && <Text style={styles.title}>{item.title}</Text>}
      </View>
      <PostImage images={item.image} />
      {item.location && (
        <View style={styles.locationContainer}>
          <LocationIcon width={16} height={16} style={styles.icon} />
          <Text style={styles.location}>{item.location}</Text>
        </View>
      )}
      <PostInteractionBar isLiked={isLiked} setIsLiked={setIsLiked} />
      <View style={styles.line} />
      <View style={styles.likeSection}>
        <Text style={styles.likeText}>
          Liked by <Text style={styles.boldText}>{item.likes || 0}</Text>
        </Text>
      </View>
      <PostComments comments={item.comments} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  titleContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
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
});

export default PostDetail;
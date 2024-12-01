import React, {memo, useCallback} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import { useToggleMode } from '../context/ThemeContext';
import {usePost} from '../context/PostContext';

const Post = ({item, source}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {updatePost} = usePost();
  const imageUri = Array.isArray(item.image) ? item.image[0] : item.image;

  const { colors } = useToggleMode();

  const navigateToDetail = useCallback(() => {
    const params = {
      item: {...item},
      previousScreen: source || route.name,
      fromScreen: source || route.name,
      username: item.user,
    };
    navigation.navigate('PostDetail', params);
  }, [navigation, route.name, item, source]);

  return (
    <TouchableOpacity 
      onPress={navigateToDetail} 
      style={[styles.container,{backgroundColor: colors.background}]}
      key={`post-${item._id}-${item.user}`}
    >
      <Image source={{uri: imageUri}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={[styles.title,{color:colors.text}]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.username}>@{item.user}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    aspectRatio: 1,
    width: '100%',
  },
  textContainer: {
    paddingTop: 6,
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  username: {
    fontSize: 12,
    color: '#657786',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
});

export default memo(Post);
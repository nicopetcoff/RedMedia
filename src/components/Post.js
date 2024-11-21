import React, {memo, useCallback} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const Post = ({item}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const imageUri = Array.isArray(item.image) ? item.image[0] : item.image;

  const navigateToDetail = useCallback(() => {
    const params = {
      item,
      previousScreen: route.name,
      fromScreen: route.name,
      username: item.user,
    };
    navigation.navigate('PostDetail', params);
  }, [navigation, route.name, item]);

  return (
    <TouchableOpacity onPress={navigateToDetail} style={styles.container}>
      <Image source={{uri: imageUri}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
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
    backgroundColor: 'white',
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
    fontFamily: 'Roboto',
  },
  username: {
    fontSize: 12,
    color: '#657786',
    fontFamily: 'Roboto',
  },
});

export default memo(Post);

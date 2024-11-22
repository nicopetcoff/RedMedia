import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import LikeIcon from '../assets/imgs/like.svg';
import FilledLikeIcon from '../assets/imgs/filled_like.svg';
import CommentIcon from '../assets/imgs/comentar.svg';

const PostInteractionBar = ({ isLiked, onLikePress, onCommentPress }) => {
  return (
    <View style={styles.interactionBar}>
      <View style={styles.leftIcons}>
        <TouchableOpacity 
          onPress={onLikePress} 
          style={styles.iconButton}
          activeOpacity={0.7}
        >
          {isLiked ? (
            <FilledLikeIcon width={24} height={24} fill="#E31B23" />
          ) : (
            <LikeIcon width={24} height={24} />
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onCommentPress} 
          style={styles.iconButton}
          activeOpacity={0.7}
        >
          <CommentIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 10,
  },
});

export default PostInteractionBar;
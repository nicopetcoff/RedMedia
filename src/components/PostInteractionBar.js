import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import LikeIcon from '../assets/imgs/like.svg';
import FilledLikeIcon from '../assets/imgs/filled_like.svg';
import CommentIcon from '../assets/imgs/comentar.svg';

const PostInteractionBar = ({ isLiked, onLikePress, onCommentPress }) => {
  return (
    <View style={styles.interactionBar}>
      <View style={styles.leftIcons}>
        {/* Botón de like */}
        <TouchableOpacity onPress={onLikePress} style={styles.iconButton}>
          {isLiked ? (
            <FilledLikeIcon width={24} height={24} />
          ) : (
            <LikeIcon width={24} height={24} />
          )}
        </TouchableOpacity>

        {/* Botón de comentar */}
        <TouchableOpacity onPress={onCommentPress} style={styles.iconButton}>
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
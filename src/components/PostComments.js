import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useToggleMode } from '../context/ThemeContext';

const PostComments = ({ comments }) => {
  const { colors } = useToggleMode();
  if (!comments || comments.length === 0) {
    return <Text style={styles.noCommentsText}>No hay comentarios aún</Text>;
  }

  return (
    <View style={styles.commentSection}>
      {comments.map((comment, index) => (
        <View key={index} style={[styles.commentContainer,{color:colors.text}]}>
          <Text style={[styles.commentUsername,{color:colors.details}]}>{comment.username}</Text>
          <Text style={[styles.commentText,{color:colors.details}]}>{comment.comment}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  commentSection: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  noCommentsText: {
    paddingHorizontal: 15,
    color: '#aaa',
    fontStyle: 'italic',
  },
});

export default PostComments;
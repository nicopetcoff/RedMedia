import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostComments = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <Text style={styles.noCommentsText}>No comments yet</Text>;
  }

  return (
    <View style={styles.commentSection}>
      {comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <Text style={styles.commentUsername}>{comment.username}</Text>
          <Text style={styles.commentText}>{comment.comment}</Text>
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
    color: '#333',
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
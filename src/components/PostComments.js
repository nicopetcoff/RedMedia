import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PostComments = ({ comments }) => {
  const [showAllComments, setShowAllComments] = useState(false);

  if (!comments || comments.length === 0) {
    return <Text>No comments yet</Text>;
  }

  const commentsToDisplay = showAllComments ? comments : comments.slice(0, 2);

  return (
    <View style={styles.commentSection}>
      {commentsToDisplay.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <Text style={styles.commentUsername}>{comment.username}</Text>
          <Text style={styles.commentText}>{comment.comment}</Text>
        </View>
      ))}
      {comments.length > 2 && (
        <TouchableOpacity onPress={() => setShowAllComments(!showAllComments)}>
          <Text style={styles.viewAllComments}>
            {showAllComments ? 'Hide comments' : 'View all comments'}
          </Text>
        </TouchableOpacity>
      )}
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
  viewAllComments: {
    color: '#888',
    marginTop: 5,
    paddingHorizontal: 15,
  },
});

export default PostComments;
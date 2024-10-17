import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import LikeIcon from '../assets/imgs/like.svg';
import FilledLikeIcon from '../assets/imgs/filled_like.svg';
import CommentIcon from '../assets/imgs/comentar.svg';
import InterestIcon from '../assets/imgs/intereses.svg';

const PostInteractionBar = ({ isLiked, setIsLiked }) => {
  return (
    <View style={styles.interactionBar}>
      <View style={styles.leftIcons}>
        {/* Botón de like */}
        <TouchableOpacity onPress={() => setIsLiked(!isLiked)} style={styles.iconButton}>
          {isLiked ? (
            <FilledLikeIcon width={24} height={24} fill="red" />
          ) : (
            <LikeIcon width={24} height={24} />
          )}
        </TouchableOpacity>

        {/* Botón de comentar */}
        <TouchableOpacity onPress={() => console.log('Comentar presionado')} style={styles.iconButton}>
          <CommentIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* Botón de intereses */}
      <TouchableOpacity onPress={() => console.log('Intereses presionado')}>
        <InterestIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center', // Asegura que los íconos estén alineados verticalmente
  },
  iconButton: {
    marginHorizontal: 10, // Agrega un espacio horizontal entre los íconos
  },
});

export default PostInteractionBar;
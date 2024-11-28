import React, { createContext, useContext } from 'react';

const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const updatePost = (updatedPost) => {
    if (!updatedPost?._id) return;
    // Esta función será sobrescrita por el HomeScreen
  };

  return (
    <PostContext.Provider value={{ updatePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};
import React from "react";
import { View, StyleSheet } from "react-native";

const Skeleton = ({ style }) => {
  return <View style={[styles.skeleton, style]} />;
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
});

export default Skeleton;

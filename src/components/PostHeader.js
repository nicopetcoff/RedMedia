// PostHeader.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const PostHeader = ({
  userAvatar,
  user,
  isFollowing,
  setIsFollowing,
  isOwnPost,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        {userAvatar && (
          <Image
            source={
              typeof userAvatar === "string"
                ? { uri: userAvatar }
                : require("../assets/imgs/avatarDefault.jpg")
            }
            style={styles.avatar}
          />
        )}
        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.username}>{user}</Text>
          </View>
        )}
      </View>
      {!isOwnPost && (
        <TouchableOpacity
          style={[styles.followButton, isFollowing && styles.followingButton]}
          onPress={() => {
            console.log("Follow button pressed");
            setIsFollowing(!isFollowing);
          }}
        >
          <Text
            style={[
              styles.followButtonText,
              isFollowing && styles.followingButtonText,
            ]}
          >
            {isFollowing ? "Unfollw" : "Follow"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Roboto",
  },
  followButton: {
    backgroundColor: "#1DA1F2",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    minWidth: 90,
    alignItems: "center",
  },
  followingButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#1DA1F2",
  },
  followButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  followingButtonText: {
    color: "#1DA1F2",
  },
});

export default PostHeader;

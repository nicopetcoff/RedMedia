import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  StatusBar,
  SafeAreaView
} from "react-native";
import Post from "../components/Post";
import { getPosts, getAds } from "../controller/miApp.controller";
import { useNavigation } from "@react-navigation/native";
import Skeleton from "../components/Skeleton";

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  const fetchData = async (isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const [postsResponse, adsResponse] = await Promise.all([
        getPosts(page),
        getAds(),
      ]);

      setAds(adsResponse.data);
      setPosts((prevPosts) =>
        isLoadMore ? [...prevPosts, ...postsResponse.data] : postsResponse.data
      );

      if (isLoadMore) {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error al cargar los datos", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const refreshData = async () => {
    setPage(1);
    setRefreshing(true);
    await fetchData(false);
  };

  useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener("focus", fetchData);
    return unsubscribe;
  }, [navigation]);

  const adIndices = useMemo(() => {
    return posts.map((_, index) =>
      (index + 1) % 4 === 0 ? Math.floor(Math.random() * ads.length) : null
    );
  }, [posts, ads]);

  const renderItem = ({ item, index }) => {
    const adIndex = adIndices[index];

    if (adIndex !== null && ads[adIndex]) {
      const randomAd = ads[adIndex];
      return (
        <TouchableOpacity
          style={styles.adContainer}
          onPress={() => Linking.openURL(randomAd.Url)}
        >
          <Image
            source={{ uri: randomAd.imagePath[0].landscape }}
            style={styles.adImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.postContainer}>
        <Post item={item} source="Home" />
      </View>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator size="small" color="#1DA1F2" />;
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.skeletonContainer}>
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} style={styles.skeleton} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/imgs/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.header}>REDMEDIA</Text>
        </View>

        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item._id || `ad`}-${index}`}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshing={refreshing}
          onRefresh={refreshData}
          onEndReached={() => fetchData(true)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0, // Eliminamos cualquier padding adicional
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    backgroundColor: "#fff",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  row: {
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  postContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 15,
  },
  adContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 15,
    height: 200,
  },
  adImage: {
    width: "100%",
    height: "100%",
  },
  skeletonContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
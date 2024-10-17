import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Image, Animated,Text} from 'react-native';
import logo from '../assets/imgs/logo.png';

export default function SplashScreen() {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, {opacity: fadeAnimation}]}>
        <Image style={styles.image} source={logo} />
        <Text style={styles.tittle}>REDMEDIA</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 200,
    flex:1,
    borderRadius: 20,
    height: 200,
    width: 200,
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: 'cover',
  },
  tittle: {
    fontSize: 40,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
    bottom: 150,
  },
});

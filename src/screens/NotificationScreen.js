// src/screens/NotificationScreen.js
import React from 'react';
import {View, Text, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import Notification from '../components/Notification';
import { getNotifications } from '../controller/miApp.controller';
import BackIcon from '../assets/imgs/back.svg'; // Icono personalizado de regreso
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
  const notificaciones=getNotifications();
  console.log(notificaciones);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() =>navigation.goBack()}
          style={styles.icon}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.title}>Activity</Text>
      </View>
      <FlatList
        data={notificaciones}
        renderItem={({item}) => <Notification item={item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    paddingHorizontal: 10,
  },
  headerContainer: {
    height: 100,
    backgroundColor: '#fcfcfc',
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
});

export default NotificationScreen;

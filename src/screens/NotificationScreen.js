// src/screens/NotificationScreen.js
import React from 'react';
import {View, Text,FlatList, StyleSheet} from 'react-native';
import Notification from '../components/Notification';
import notificaciones from '../data/notificaciones.json';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Activity</Text>
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
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  headerContainer: {
    paddingVertical: 30,
  },
  header: {
    fontSize: 26,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
});

export default NotificationScreen;

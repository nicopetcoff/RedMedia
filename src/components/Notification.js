// src/components/Notification.js
import React from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getTimeDifference} from '../controller/miApp.controller';

const Notification = ({item}) => {
  const navigation = useNavigation();

  const getImage = () => {
    switch (item.type) {
      case 'Trending':
        return require('../assets/imgs/like.png');
      case 'Comment':
        return require('../assets/imgs/comment.png');
      case 'Followed':
        return require('../assets/imgs/followed.png');
      default:
        return require('../assets/imgs/comment.png');
    }
  };

  return (
    <View style={styles.Notification}>
      <Image source={getImage()} style={styles.imagen} />
      <View style={styles.activityItem}>
        <Text style={styles.activityType}>{item.type}</Text>
        <View style={styles.action}>
          {item.icon}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('profile', {username: item.user})
            } style={styles.action}>
            <Text style={styles.activityUser}>{item.user}</Text>
            </TouchableOpacity>
            {
            item.type ==='Followed' ?
              <Text style={[styles.activityText]}> {item.text}</Text>
              :
              <TouchableOpacity 
                onPress={() => 
                  navigation.navigate('PostDetail', {item: item.post})}>
                <Text style={[styles.activityText]}>{item.text}</Text>
              </TouchableOpacity> 
            }

        </View>
        <Text style={styles.activityTime}>{ getTimeDifference(item.time)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Notification: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityItem: {
    marginLeft: 10,
    padding: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(242, 244, 245, 0.5)',
    flex: 1,
  },
  activityType: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    lineHeight: 22,
    fontSize: 17,
    color: 'black',
    marginRight: 5,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityUser: {
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Roboto',
    color: 'black',
  },
  activityText: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Roboto',
  },
  activityTime: {
    marginTop: 5,
    alignSelf: 'flex-end',
    color: '#999',
    fontSize: 12,
  },
});

export default Notification;

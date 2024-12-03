import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import PostDetail from '../screens/PostDetail';

const Stack = createStackNavigator();

const NotificationStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Activity"
        component={NotificationScreen}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default NotificationStackScreen;

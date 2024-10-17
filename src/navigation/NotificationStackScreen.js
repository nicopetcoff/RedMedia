import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';
import BackIcon from '../assets/imgs/back.svg';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createStackNavigator();

const NotificationStackScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Activity"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StackProfile"
        component={ProfileScreen}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}>
              <BackIcon width={24} height={24} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default NotificationStackScreen;

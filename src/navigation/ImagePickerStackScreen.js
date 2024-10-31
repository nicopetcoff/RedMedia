import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import ImagePickerScreen from '../screens/ImagePickerScreen';
import BackIcon from '../assets/imgs/back.svg';

const Stack = createStackNavigator();

const NotificationStackScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ImagePicker"
        component={ImagePickerScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default NotificationStackScreen;

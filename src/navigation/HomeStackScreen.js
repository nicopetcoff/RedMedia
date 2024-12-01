// HomeStackScreen.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import PostDetail from '../screens/PostDetail';
import ProfileScreen from '../screens/ProfileScreen';
import { useToggleMode } from '../context/ThemeContext';

const Stack = createStackNavigator();

const HomeStackScreen = () => {

  const { colors } = useToggleMode();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={({route, navigation}) => ({
          headerTitle: '',
          
          headerStyle: {
            backgroundColor: colors.background, 
          },
          headerTintColor: colors.text,
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({route, navigation}) => ({
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.background, 
          },
          headerTintColor: 'white',
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;

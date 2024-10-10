// src/navigation/HomeStackScreen.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator'; // Importamos el BottomTabNavigator
import PostDetail from '../screens/PostDetail'; // Importamos PostDetail

const Stack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
     
      <Stack.Screen name="MainTab" component={BottomTabNavigator} />
      
      <Stack.Screen name="PostDetail" component={PostDetail} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;
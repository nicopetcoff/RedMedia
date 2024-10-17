import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import PostDetail from '../screens/PostDetail';
import ProfileScreen from '../screens/ProfileScreen'; // Pantalla de perfil
import BackIcon from '../assets/imgs/back.svg'; // Icono personalizado

const Stack = createStackNavigator();

const HomeStackScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
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
      <Stack.Screen
        name="Profile"
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

export default HomeStackScreen;

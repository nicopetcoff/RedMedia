// HomeStackScreen.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import PostDetail from '../screens/PostDetail';
import ProfileScreen from '../screens/ProfileScreen';
import BackIcon from '../assets/imgs/back.svg';

const Stack = createStackNavigator();

const HomeStackScreen = () => {
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
          headerLeft: () => {
            const {previousScreen, username, fromScreen} = route.params || {};

            return (
              <TouchableOpacity
                onPress={() => {
                  if (
                    previousScreen === 'Profile' &&
                    fromScreen === 'Profile'
                  ) {
                    // Si venimos originalmente del perfil, volvemos al perfil
                    navigation.navigate('Profile', {
                      username,
                      fromScreen: 'Home', // Esto asegura que el siguiente back vaya a Home
                    });
                  } else {
                    // En cualquier otro caso, volvemos a Home
                    navigation.navigate('Home');
                  }
                }}
                style={{marginLeft: 10}}>
                <BackIcon width={24} height={24} />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({route, navigation}) => ({
          headerTitle: '',
          headerLeft: () => {
            const {fromScreen} = route.params || {};

            return (
              <TouchableOpacity
                onPress={() => {
                  // Siempre volvemos a Home desde Profile
                  navigation.navigate('Home');
                }}
                style={{marginLeft: 10}}>
                <BackIcon width={24} height={24} />
              </TouchableOpacity>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;

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
        unmountOnBlur: true,
        detachInactiveScreens: true,
        ...defaultScreenOptions,
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
            console.log('PostDetail Header - Navigation params:', {
              previousScreen,
              username,
              fromScreen,
            });

            return (
              <TouchableOpacity
                onPress={() => {
                  if (previousScreen === 'Profile' && fromScreen === 'Profile') {
                    console.log('PostDetail Header - Navigating back to Profile');
                    // Limpiar la pila de navegación antes de navegar al perfil
                    navigation.reset({
                      index: 1,
                      routes: [
                        { name: 'Home' },
                        {
                          name: 'Profile',
                          params: {
                            username,
                            fromScreen: 'Home',
                            timestamp: Date.now(),
                          },
                        },
                      ],
                    });
                  } else {
                    console.log('PostDetail Header - Going back');
                    navigation.goBack();
                  }
                }}
                style={{
                  marginLeft: 10,
                  padding: 10,
                }}>
                <BackIcon width={24} height={24} />
              </TouchableOpacity>
            );
          },
          headerStyle: defaultScreenOptions.headerStyle,
          cardStyle: defaultScreenOptions.cardStyle,
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log('Profile Header - Navigating to Home');
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                });
              }}
              style={{
                marginLeft: 10,
                padding: 10,
              }}>
              <BackIcon width={24} height={24} />
            </TouchableOpacity>
          ),
          headerStyle: defaultScreenOptions.headerStyle,
          cardStyle: defaultScreenOptions.cardStyle,
        })}
      />
    </Stack.Navigator>
  );
};

const defaultScreenOptions = {
  headerBackTitleVisible: false,
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  headerTintColor: '#000',
  cardStyle: {
    backgroundColor: '#ffffff',
  },
};

export default HomeStackScreen;
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from '../assets/imgs/home.svg';
import SearchIcon from '../assets/imgs/search.svg';
import CreatePostIcon from '../assets/imgs/add_circle.svg';
import NotificationIcon from '../assets/imgs/heart.svg';
import ProfileIcon from '../assets/imgs/profile.svg';
import HomeStackScreen from './HomeStackScreen'; 
import SearchScreen from '../screens/SearchScreen';
import ImagePickerScreen from '../screens/ImagePickerScreen';
import NotificationStackScreen from './NotificationStackScreen';
import LoggedInUserProfileScreen from '../screens/LoggedInUserProfileScreen';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ route, color, size }) => {
  switch (route.name) {
    case 'HomeStack':
      return <HomeIcon width={size} height={size} />;
    case 'Search':
      return <SearchIcon width={size} height={size} />;
    case 'CreatePost':
      return <CreatePostIcon width={size} height={size} />;
    case 'Notifications':
      return <NotificationIcon width={size} height={size} />;
    case 'Profile':
      return <ProfileIcon width={size} height={size} />;
    default:
      return null;
  }
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: props => <TabBarIcon route={route} {...props} />,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="CreatePost" component={ImagePickerScreen} />
      <Tab.Screen name="Notifications" component={NotificationStackScreen} />
      <Tab.Screen name="Profile" component={LoggedInUserProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
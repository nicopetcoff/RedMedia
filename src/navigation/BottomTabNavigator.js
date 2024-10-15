import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeIcon from '../assets/home.svg'; // Importa tu archivo SVG
import SearchIcon from '../assets/search.svg';
import CreatePostIcon from '../assets/add_circle.svg';
import NotificationIcon from '../assets/heart.svg';
import ProfileIcon from '../assets/profile.svg';
import HomeStackScreen from './HomeStackScreen'; // Importamos HomeStackScreen
import SearchScreen from '../screens/SearchScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import NotificationStackScreen from './NotificationStackScreen';
import LoggedInUserProfileScreen from '../screens/LoggedInUserProfileScreen';
import MyProfile from '../components/MyProfileHeader';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({route, color, size}) => {
  // Usamos diferentes íconos dependiendo de la ruta
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
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: props => <TabBarIcon route={route} {...props} />,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="CreatePost" component={CreatePostScreen} />
      <Tab.Screen name="Notifications" component={NotificationStackScreen} />
      <Tab.Screen name="Profile" component={MyProfile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

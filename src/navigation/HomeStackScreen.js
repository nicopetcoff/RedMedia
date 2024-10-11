import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import PostDetail from '../screens/PostDetail';
import BackIcon from '../assets/back.svg'; // Icono personalizado de regreso

const Stack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{
          headerTitle: '', // Ocultamos el título
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 10 }}>
              <BackIcon width={24} height={24} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import PostDetail from './src/screens/PostDetail';
import Footer from './src/components/Footer';
import 'react-native-gesture-handler'; // Asegúrate de que esta línea esté al principio

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PostDetail" component={PostDetail} />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};

export default App;
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackScreen from './src/navigation/HomeStackScreen'; // Importamos el HomeStackScreen

const App = () => {
  return (
    <NavigationContainer>
      <HomeStackScreen />
    </NavigationContainer>
  );
};

export default App;
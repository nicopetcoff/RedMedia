import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Mantén la importación por si la necesitas después
// import BottomTabNavigator from './src/navigation/BottomTabNavigator'; // Comentar esto por ahora
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen'; // Importamos la pantalla de Login
import SignUpScreen from './src/screens/SignUpScreen'; // Importamos la pantalla de registro
import SignInScreen from './src/screens/SignInScreen'; // Importamos la pantalla de Sign In

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Pantalla de Login */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Ocultamos el header para el login
        />
        {/* Pantalla de SignUp */}
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{ headerShown: false }} // Ocultamos el header para el registro
        />
        {/* Pantalla de SignIn */}
        <Stack.Screen 
          name="SignIn" 
          component={SignInScreen} 
          options={{ headerShown: false }} // Ocultamos el header para la pantalla de Sign In
        />
      
      </Stack.Navigator>

      {/* Comentado el BottomTabNavigator por ahora 
      /*
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
       */}
    </NavigationContainer>
  );
};

export default App;
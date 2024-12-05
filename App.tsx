// App.js
import React, { useEffect } from "react";
import { AuthProvider } from "./src/context/AuthProvider";
import { PostProvider } from "./src/context/PostContext"; // Añadir este import
import AppNavigator from "./src/navigation/AppNavigator";
import NetInfo from "@react-native-community/netinfo";
import { Alert, StatusBar } from "react-native";
import RNRestart from 'react-native-restart';
import SplashScreen from 'react-native-splash-screen';
import {ThemeProvider} from "./src/context/ThemeContext";

const App = () => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    if (!state.isConnected) {
      Alert.alert(
        "Sin conexion a internet",
        "Por favor conectese a internet para poder usar la aplicacion",
        [{ 
          text: "Reintentar", 
          onPress: () => RNRestart.Restart() 
        }]
      );
    }
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#ffffff" 
      />
      <ThemeProvider>
        <AuthProvider>
          <PostProvider> 
            <AppNavigator />
          </PostProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
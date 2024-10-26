// src/context/AuthContext.js
import React, {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signIn as signInAPI} from '../controller/miApp.controller';
import {Alert} from 'react-native';

// Crear el contexto
const AuthContext = React.createContext();
const toggleContext = React.createContext();

export function useUserContext() {
  return useContext(AuthContext);
}

export function useToggleContext() {
  return useContext(toggleContext);
}

export const AuthProvider = ({children}) => {
  // Estado para guardar los datos de autenticación
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  // Restaurar token de AsyncStorage al cargar la aplicación
  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      if (token && user) {
        setAuthState({
          user,
          token,
          isAuthenticated: true,
        });
      }
    };
    fetchData();
  }, []);

  // Función para iniciar sesión y guardar datos en AsyncStorage
  const login = userData => {
    const fetchData = async () => {
      try {
        const response = await signInAPI(userData);
        if (response.token) {
          AsyncStorage.setItem('token', response.token);
          AsyncStorage.setItem('user', JSON.stringify(userData.email));
          
        } else {
          Alert.alert('Error', 'Login failed, please try again.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        Alert.alert('Error', 'Something went wrong during login.');
      }
    };

    fetchData();
    setAuthState({
      user: userData.user,
      token: userData.token,
      isAuthenticated: true,
    });
  };

  // Función para cerrar sesión y limpiar AsyncStorage
  const signOut = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user');
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  // Función para restaurar el token y validar la autenticación
  const restoreToken = token => {
    const user = JSON.parse(AsyncStorage.getItem('user'));

    if (token && user) {
      setAuthState({
        user,
        token,
        isAuthenticated: true,
      });
    } else {
      signOut();
    }
  };

  return (
    <AuthContext.Provider value={authState}>
      <toggleContext.Provider value={{login, signOut, restoreToken}}>
        {children}
      </toggleContext.Provider>
    </AuthContext.Provider>
  );
};

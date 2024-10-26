// App.js
import React, { useState, useEffect } from 'react';
import SplashScreen from './src/screens/SplashScreen'; // Importamos el SplashScreen
import AppNavigator from './src/navigation/AppNavigator'; // Importamos la nueva navegación
import { AuthProvider } from './src/context/AuthProvider';

const App = () => {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 2000);
  }, []);

  return (
    <AuthProvider>
      
        <AppNavigator />
      
    </AuthProvider>
  );
};

export default App;
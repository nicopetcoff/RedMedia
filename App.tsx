// App.js
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import SplashScreen from './src/screens/SplashScreen'; // Importamos el SplashScreen
import AppNavigator from './src/navigation/AppNavigator'; // Importamos la nueva navegación

const App = () => {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      {isShowSplashScreen ? (
        <SplashScreen />
      ) : (
        <AppNavigator />
      )}
    </Provider>
  );
};

export default App;
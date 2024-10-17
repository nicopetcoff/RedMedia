import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import SplashScreen from './src/screens/SplashScreen';

const App = () => {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 2000);
  });

  return (
    <>
      {isShowSplashScreen ? (
          <SplashScreen />
        ) : (
          <NavigationContainer>
            <BottomTabNavigator />
          </NavigationContainer>
        )}
    </>
      
    
  );
};

export default App;
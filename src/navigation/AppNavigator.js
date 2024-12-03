import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";
import LoginScreen from "../screens/LoginScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { useUserContext } from "../context/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToggleMode } from "../context/ThemeContext";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const getTheme = async () => {
      const theme = await AsyncStorage.getItem('theme');
      return theme==='dark';
    }

  const {toggleTheme} = useToggleMode();
  const { isAuthenticated, loading } = useUserContext();

  useEffect(() => {
    fetchTheme()
  }, []);

  const fetchTheme = async () => {
    const theme = await getTheme();
    if (theme) {
      toggleTheme();
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen name="MainApp" component={BottomTabNavigator} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerTitle: "" }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerTitle: "" }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerTitle: "" }} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
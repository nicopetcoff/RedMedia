import React from "react";
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

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, loading } = useUserContext();

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
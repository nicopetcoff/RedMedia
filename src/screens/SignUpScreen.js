import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { signUp } from "../controller/miApp.controller";
import { Formik } from "formik";
import { signUpValidationSchema } from "../context/validationSchemas";
import { FormikInputValue } from "../components/FormikInputValue";
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const handleSignUp = async (userData) => {
    try {
      const response = await signUp(userData);
      Alert.alert("Success", response.message, [
        { text: "OK", onPress: () => navigation.navigate("SignIn") },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const initialValues = {
    email: "",
    password: "",
    name: "",
    lastName: "",
    nick: "",
  };

  return (
    <Formik
      validationSchema={signUpValidationSchema}
      initialValues={initialValues}
      onSubmit={(values) => handleSignUp(values)}
    >
      {({ handleSubmit }) => {
        return (
          <View style={styles.container}>
            <Image
              source={require("../assets/imgs/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Create your account</Text>
            <FormikInputValue
              name="email"
              placeholder="Enter your email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
            />
            <FormikInputValue
              name="password"
              placeholder="Enter your password"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
            />
            <FormikInputValue
              name="name"
              placeholder="Enter your name"
              placeholderTextColor="#aaa"
            />
            <FormikInputValue
              name="lastName"
              placeholder="Enter your LastName"
              placeholderTextColor="#aaa"
            />
            <FormikInputValue
              name="nick"
              placeholder="Enter your nick"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSubmit}
            >
              <Text style={styles.signUpButtonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "#000",
  },
  signUpButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginTop: 10,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 20,
    marginTop: -10,
    fontSize: 12,
  },
});

export default SignUpScreen;
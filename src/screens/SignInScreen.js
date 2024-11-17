import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useToggleContext } from "../context/AuthProvider";
import { Formik } from "formik";
import { SignInValidationSchema } from "../context/validationSchemas";
import {FormikInputValue} from "../components/FormikInputValue";

const SignInScreen = ({ navigation }) => {
  const { login } = useToggleContext();

  const handleSignIn = async ({email,password}) => {
    await login({ email, password });
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const initialValues = { 
    email: "", 
    password: "" 
  }

  return (
    <Formik
      validationSchema={SignInValidationSchema}
      initialValues={initialValues}
      onSubmit={(values) => handleSignIn(values)}
    >
      {({ handleSubmit }) => {
        return (
          <View style={styles.container}>
            <Image
              source={require("../assets/imgs/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>REDMEDIA</Text>
            <Text style={styles.welcomeText}>Welcome Again</Text>

          <FormikInputValue name="email" placeholder="Enter your email" placeholderTextColor="#aaa" keyboardType="email-address" />
          <FormikInputValue name="password" placeholder="Enter your password" placeholderTextColor="#aaa" secureTextEntry={true} />

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSubmit}
            >
              <Text style={styles.signInButtonText}>Login</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "black",
  },
  forgotPasswordText: {
    color: "#4285F4",
    fontSize: 14,
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  signInButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginTop: 10,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },error: {
    color: "red",
    marginBottom: 20,
    marginTop: -10,
    fontSize: 12,
  },
});

export default SignInScreen;

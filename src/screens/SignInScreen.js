// SignInScreen.js

import React, { useState } from "react";
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
import { FormikInputValue } from "../components/FormikInputValue";
import EyeIcon from '../assets/imgs/eyeIcon.svg'; // Icono para mostrar/ocultar contraseña

const SignInScreen = ({ navigation }) => {
  const { login } = useToggleContext();
  const [showPassword, setShowPassword] = useState(false); // Estado para la visibilidad de la contraseña

  const handleSignIn = async ({ email, password }) => {
    try {
      await login({ email, password });
    } catch (error) {
      Alert.alert("Error", error.message || "Error al iniciar sesión");
    }
  };
  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const initialValues = { 
    email: "", 
    password: "" 
  };

  return (
    <Formik
      validationSchema={SignInValidationSchema}
      initialValues={initialValues}
      onSubmit={(values) => handleSignIn(values)}
    >
      {({ handleSubmit, errors, touched }) => {
        return (
          <View style={styles.container}>
            <Image
              source={require("../assets/imgs/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>REDMEDIA</Text>
            <Text style={styles.welcomeText}>Welcome Again</Text>

            {/* Campo de Email */}
            <FormikInputValue 
              name="email" 
              placeholder="Enter your email" 
              placeholderTextColor="#aaa" 
              keyboardType="email-address" 
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            {/* Campo de Contraseña con Toggle */}
            <View style={styles.passwordContainer}>
              <FormikInputValue 
                name="password" 
                placeholder="Enter your password" 
                placeholderTextColor="#aaa" 
                secureTextEntry={!showPassword} 
                style={styles.passwordInput}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)} 
                style={styles.eyeButton}
                accessibilityLabel={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                accessibilityRole="button"
              >
                <EyeIcon 
                  width={24} 
                  height={24} 
                  style={[
                    styles.eyeIcon, 
                    showPassword && styles.eyeIconActive
                  ]}
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {/* Enlace de Olvidé mi Contraseña */}
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Botón de Iniciar Sesión */}
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
    resizeMode: 'contain',
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
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    color: "black",
  },
  eyeButton: {
    padding: 5,
  },
  eyeIcon: {
    transition: 'transform 0.3s', // Animación suave al rotar
  },
  eyeIconActive: {
    transform: [{ rotate: '180deg' }], // Rota el icono cuando la contraseña es visible
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
    width: '100%',
    alignItems: 'center',
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
});

export default SignInScreen;
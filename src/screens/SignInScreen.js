import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import { signInValidationSchema } from '../context/validationSchemas';
import { FormikInputValue } from '../components/FormikInputValue';
import EyeIcon from '../assets/imgs/eyeIcon.svg';
import { useToggleContext } from '../context/AuthProvider';

const SignInScreen = ({ navigation }) => {
  const { login } = useToggleContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (values) => {
    try {
      await login(values);
    } catch (error) {
      Alert.alert('Error', error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Formik
      validationSchema={signInValidationSchema}
      initialValues={{ email: '', password: '' }}
      onSubmit={handleSignIn}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <Image source={require('../assets/imgs/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Sign In</Text>

          <FormikInputValue
            name="email"
            placeholder="Enter your email"
            keyboardType="email-address"
            testID="email"
          />
          <FormikInputValue
            name="password"
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            testID="password"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <EyeIcon width={24} height={24} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={handleSubmit} testID="Login">
            <Text style={styles.signInButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  forgotPasswordText: {
    color: '#4285F4',
    marginTop: 10,
  },
  signInButton: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SignInScreen;

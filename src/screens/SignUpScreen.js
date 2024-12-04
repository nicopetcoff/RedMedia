import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import EyeIcon from '../assets/imgs/eyeIcon.svg';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import { signUpValidationSchema } from '../context/validationSchemas';
import { signUp } from '../controller/miApp.controller';

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (values) => {
    try {
      const response = await signUp(values);
      if (response.message) {
        Alert.alert('Registro exitoso', response.message, [{ text: 'OK' }]);
      } else {
        Alert.alert('Error', 'Error inesperado al registrarse.');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'Hubo un problema con el registro. Intenta nuevamente.'
      );
    }
  };

  return React.createElement(
    Formik,
    {
      initialValues: {
        name: '',
        lastName: '',
        nick: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: 'Not specified',
      },
      validationSchema: signUpValidationSchema,
      onSubmit: handleSignUp,
    },
    (formikProps) => React.createElement(
      View,
      { style: styles.container },
      // Logo de Red Media
      React.createElement(Image, {
        source: require('../assets/imgs/logo.png'),
        style: styles.logo,
      }),
      // Título
      React.createElement(Text, { style: styles.title }, 'Create Your Account'),
      // Nombre
      React.createElement(TextInput, {
        style: [
          styles.input,
          formikProps.touched.name && formikProps.errors.name
            ? styles.inputError
            : null,
        ],
        placeholder: 'Enter your name',
        placeholderTextColor: '#aaa',
        value: formikProps.values.name,
        onChangeText: formikProps.handleChange('name'),
        onBlur: formikProps.handleBlur('name'),
      }),
      formikProps.touched.name && formikProps.errors.name
        ? React.createElement(Text, { style: styles.errorText }, formikProps.errors.name)
        : null,
      // Apellido
      React.createElement(TextInput, {
        style: [
          styles.input,
          formikProps.touched.lastName && formikProps.errors.lastName
            ? styles.inputError
            : null,
        ],
        placeholder: 'Enter your last name',
        placeholderTextColor: '#aaa',
        value: formikProps.values.lastName,
        onChangeText: formikProps.handleChange('lastName'),
        onBlur: formikProps.handleBlur('lastName'),
      }),
      formikProps.touched.lastName && formikProps.errors.lastName
        ? React.createElement(Text, { style: styles.errorText }, formikProps.errors.lastName)
        : null,
      // Nickname
      React.createElement(TextInput, {
        style: [
          styles.input,
          formikProps.touched.nick && formikProps.errors.nick
            ? styles.inputError
            : null,
        ],
        placeholder: 'Enter your nickname',
        placeholderTextColor: '#aaa',
        value: formikProps.values.nick,
        onChangeText: formikProps.handleChange('nick'),
        onBlur: formikProps.handleBlur('nick'),
      }),
      formikProps.touched.nick && formikProps.errors.nick
        ? React.createElement(Text, { style: styles.errorText }, formikProps.errors.nick)
        : null,
      // Email
      React.createElement(TextInput, {
        style: [
          styles.input,
          formikProps.touched.email && formikProps.errors.email
            ? styles.inputError
            : null,
        ],
        placeholder: 'Enter your email',
        placeholderTextColor: '#aaa',
        keyboardType: 'email-address',
        value: formikProps.values.email,
        onChangeText: formikProps.handleChange('email'),
        onBlur: formikProps.handleBlur('email'),
      }),
      formikProps.touched.email && formikProps.errors.email
        ? React.createElement(Text, { style: styles.errorText }, formikProps.errors.email)
        : null,
      // Contraseña
      React.createElement(
        View,
        { style: styles.passwordContainer },
        React.createElement(TextInput, {
          style: [
            styles.passwordInput,
            formikProps.touched.password && formikProps.errors.password
              ? styles.inputError
              : null,
          ],
          placeholder: 'Enter your password',
          placeholderTextColor: '#aaa',
          secureTextEntry: !showPassword,
          value: formikProps.values.password,
          onChangeText: formikProps.handleChange('password'),
          onBlur: formikProps.handleBlur('password'),
        }),
        React.createElement(
          TouchableOpacity,
          {
            onPress: () => setShowPassword(!showPassword),
            style: styles.eyeButton,
          },
          React.createElement(EyeIcon, {
            width: 24,
            height: 24,
            style: showPassword ? styles.eyeIconActive : styles.eyeIcon,
          })
        )
      ),
      formikProps.touched.password && formikProps.errors.password
        ? React.createElement(Text, { style: styles.errorText }, formikProps.errors.password)
        : null,
      // Género (Picker)
      React.createElement(
        View,
        { style: styles.pickerContainer },
        React.createElement(Picker, {
          selectedValue: formikProps.values.gender,
          onValueChange: formikProps.handleChange('gender'),
        }, [
          React.createElement(Picker.Item, { label: 'Not specified', value: 'Not specified', key: '1' }),
          React.createElement(Picker.Item, { label: 'Male', value: 'Male', key: '2' }),
          React.createElement(Picker.Item, { label: 'Female', value: 'Female', key: '3' }),
        ])
      ),
      // Botón de Registro
      React.createElement(
        TouchableOpacity,
        {
          style: styles.signUpButton,
          onPress: formikProps.handleSubmit,
        },
        React.createElement(Text, { style: styles.signUpButtonText }, 'Sign Up')
      )
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: 'black',
  },
  inputError: {
    borderColor: 'red',
  },
  eyeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  eyeIcon: {
    tintColor: '#aaa',
  },
  eyeIconActive: {
    tintColor: '#4285F4',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 15,
  },
  signUpButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: { marginBottom: 20 },
  logo: { width: 100, height: 100, marginBottom: 20, alignSelf: 'center' },
});

export default SignUpScreen;

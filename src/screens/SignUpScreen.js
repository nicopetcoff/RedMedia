import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { signUp } from '../controller/miApp.controller'; // Importamos la función para enviar los datos

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nick, setNick] = useState('');

  // Función para validar los campos
  const handleSignUp = async () => {
    if (!email || !password || !name || !lastName || !nick) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    // Preparar el objeto con los datos del usuario
    const userData = {
      email,
      password,
      name,
      lastName,
      nick,
    };

    try {
      // Llamar a la función signUp que enviará los datos al backend
      const response = await signUp(userData);

      if (response.success) {
        Alert.alert('Success', 'User registered successfully!');
      } else {
        Alert.alert('Error', response.message || 'Failed to sign up.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image 
        source={require('../assets/logo.png')} // Asegúrate de tener el logo en tu carpeta assets
        style={styles.logo}
      />
      <Text style={styles.title}>Create your account</Text>

      {/* Campo de entrada de email */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        textContentType="emailAddress"
      />

      {/* Campo de entrada de password */}
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Campo de entrada de nombre */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

      {/* Campo de entrada de apellido */}
      <TextInput
        style={styles.input}
        placeholder="Enter your LastName"
        placeholderTextColor="#aaa"
        value={lastName}
        onChangeText={setLastName}
      />

      {/* Campo de entrada de nickname */}
      <TextInput
        style={styles.input}
        placeholder="Enter your nick"
        placeholderTextColor="#aaa"
        value={nick}
        onChangeText={setNick}
      />

      {/* Botón de registro */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    color: '#000', // Cambié a negro para que coincida con el estilo de la imagen
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000', // El texto será negro
  },
  signUpButton: {
    backgroundColor: '#4285F4', // Botón azul
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#fff', // Texto blanco
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
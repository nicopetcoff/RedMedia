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
      
      <Image 
        source={require('../assets/imgs/logo.png')} // Asegúrate de tener el logo en tu carpeta assets
        style={styles.logo}
      />
      <Text style={styles.title}>Create your account</Text>

      
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

      
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

      
      <TextInput
        style={styles.input}
        placeholder="Enter your LastName"
        placeholderTextColor="#aaa"
        value={lastName}
        onChangeText={setLastName}
      />

      
      <TextInput
        style={styles.input}
        placeholder="Enter your nick"
        placeholderTextColor="#aaa"
        value={nick}
        onChangeText={setNick}
      />

      
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
    color: '#000',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000',
  },
  signUpButton: {
    backgroundColor: '#4285F4', 
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
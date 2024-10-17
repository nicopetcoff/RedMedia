import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn } from '../redux/authSlice';
import { signIn as signInAPI } from '../controller/miApp.controller';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const userData = { email, password };
      const response = await signInAPI(userData);

      if (response.token) {
        
        await AsyncStorage.setItem('userToken', response.token);
        
        
        dispatch(signIn({ user: response.user, token: response.token }));

        
        navigation.replace('MainApp');
      } else {
        Alert.alert('Error', 'Login failed, please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Something went wrong during login.');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword'); 
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/imgs/logo.png')} style={styles.logo} />
      <Text style={styles.title}>REDMEDIA</Text>
      <Text style={styles.welcomeText}>Welcome back</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Login</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: 'black',
  },
  forgotPasswordText: {
    color: '#4285F4',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  signInButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginTop: 10,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
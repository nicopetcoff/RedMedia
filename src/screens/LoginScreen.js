import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const LoginScreen = ({navigation}) => {

  const handleGooglePress = () => {
    console.log("Google Sign In button pressed");
  };

  const handleEmailSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Image 

        source={require('../assets/imgs/logo.png')} // Asegúrate de tener la imagen del logo en tu carpeta assets

        style={styles.logo}
      />
      <Text style={styles.title}>REDMEDIA</Text>

      <TouchableOpacity style={styles.googleButton} onPress={handleGooglePress}>
        <View style={styles.googleButtonContent}>
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png' }}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Sign Up with Google</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.signInText}>
        Already have an account?{' '}
        <Text style={styles.signInLink} onPress={handleSignInPress}>Sign in</Text>
      </Text>
      
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.emailButton} onPress={handleEmailSignUp}>
        <Text style={styles.emailButtonText}>Sign up with Email</Text>
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
    marginBottom: 40,
    color: '#333',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 240,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInText: {
    marginTop: 15,
    fontSize: 14,
    color: '#333',
  },
  signInLink: {
    fontWeight: 'bold',
    color: '#4285F4',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: '#ccc',
  },
  emailButton: {
    marginTop: 10,
  },
  emailButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default LoginScreen;
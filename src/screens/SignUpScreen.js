import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import {signUpValidationSchema} from '../context/validationSchemas';
import {FormikInputValue} from '../components/FormikInputValue';
import EyeIcon from '../assets/imgs/eyeIcon.svg'; // Icono para mostrar/ocultar contraseña
import {useNavigation} from '@react-navigation/native';
import {signUp} from '../controller/miApp.controller'; // Importa la función signUp directamente

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false); // Estado para la visibilidad de la contraseña

  const handleSignUp = async userData => {
    try {
      const response = await signUp(userData); // Llama a la función signUp desde el controlador

      if (response.token) {
        Alert.alert('Success', response.message || 'Registro exitoso', [
          {text: 'OK', onPress: () => navigation.goBack()}, // Regresa a la pantalla anterior
        ]);
      } else {
        Alert.alert('Error', response.message || 'Registro fallido');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Error al registrarse');
    }
  };

  const initialValues = {
    email: '',
    password: '',
    name: '',
    lastName: '',
    nick: '',
  };

  return (
    <Formik
      validationSchema={signUpValidationSchema}
      initialValues={initialValues}
      onSubmit={values => handleSignUp(values)}>
      {({handleSubmit, errors, touched}) => {
        return (
          <View style={styles.container}>
            <Image
              source={require('../assets/imgs/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Create your account</Text>

            {/* Campo de Nombre */}
            <FormikInputValue
              name="name"
              placeholder="Enter your name"
              placeholderTextColor="#aaa"
            />
            {errors.name && touched.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}

            {/* Campo de Apellido */}
            <FormikInputValue
              name="lastName"
              placeholder="Enter your last name"
              placeholderTextColor="#aaa"
            />
            {errors.lastName && touched.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}

            {/* Campo de Nickname */}
            <FormikInputValue
              name="nick"
              placeholder="Enter your nickname"
              placeholderTextColor="#aaa"
            />
            {errors.nick && touched.nick && (
              <Text style={styles.error}>{errors.nick}</Text>
            )}

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
                accessibilityLabel={
                  showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                }
                accessibilityRole="button">
                <EyeIcon
                  width={24}
                  height={24}
                  style={[styles.eyeIcon, showPassword && styles.eyeIconActive]}
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {/* Botón de Registro */}
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSubmit}>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
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
    color: 'black',
  },
  eyeButton: {
    padding: 5,
  },
  eyeIcon: {
    transition: 'transform 0.3s', // Animación suave al rotar
  },
  eyeIconActive: {
    transform: [{rotate: '180deg'}], // Rota el icono cuando la contraseña es visible
  },
  signUpButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
});

export default SignUpScreen;
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import { signUpValidationSchema } from '../context/validationSchemas';
import { FormikInputValue } from '../components/FormikInputValue';
import EyeIcon from '../assets/imgs/eyeIcon.svg';
import { useNavigation } from '@react-navigation/native';
import { signUp } from '../controller/miApp.controller';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Prefiere no decirlo');

  const handleSignUp = async userData => {
    try {
      const response = await signUp(userData);
      if (response.message) {
        if (response.message.includes('confirmar tu cuenta')) {
          Alert.alert(
            'Registro exitoso',
            response.message,
            [{ text: 'OK', onPress: () => navigation.goBack() }],
            { cancelable: false }
          );
        } else {
          Alert.alert('Error', response.message, [{ text: 'OK' }], { cancelable: true });
        }
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

  const initialValues = {
    email: '',
    password: '',
    name: '',
    lastName: '',
    nick: '',
    genero: 'Prefiere no decirlo',
  };

  return (
    <Formik
      validationSchema={signUpValidationSchema}
      initialValues={initialValues}
      onSubmit={values => handleSignUp({ ...values, genero: selectedGender })}
    >
      {({ handleSubmit, errors, touched }) => (
        <View style={styles.container}>
          <Image source={require('../assets/imgs/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Create your account</Text>
          <FormikInputValue name="name" placeholder="Enter your name" placeholderTextColor="#aaa" />
          {errors.name && touched.name && <Text style={styles.error}>{errors.name}</Text>}
          <FormikInputValue name="lastName" placeholder="Enter your last name" placeholderTextColor="#aaa" />
          {errors.lastName && touched.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
          <FormikInputValue name="nick" placeholder="Enter your nickname" placeholderTextColor="#aaa" />
          {errors.nick && touched.nick && <Text style={styles.error}>{errors.nick}</Text>}
          <FormikInputValue
            name="email"
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
          />
          {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}
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
              accessibilityLabel={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              accessibilityRole="button"
            >
              <EyeIcon
                width={24}
                height={24}
                style={[styles.eyeIcon, showPassword && styles.eyeIconActive]}
              />
            </TouchableOpacity>
          </View>
          {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Gender:</Text>
            <Picker
              selectedValue={selectedGender}
              style={styles.picker}
              onValueChange={itemValue => setSelectedGender(itemValue)}
            >
              <Picker.Item label="Male" value="Masculino" />
              <Picker.Item label="Female" value="Femenino" />
              <Picker.Item label="Prefer not to say" value="Not specified" />
            </Picker>
          </View>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
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
  pickerContainer: {
    width: '100%',
    marginVertical: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
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
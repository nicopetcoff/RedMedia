import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import SignInScreen from '../src/screens/SignInScreen';
import { AuthProvider } from '../src/context/AuthProvider';
import { signIn } from '../src/controller/miApp.controller';
import * as Keychain from 'react-native-keychain';

// Mockear dependencias
jest.mock('react-native-keychain', () => ({
  getGenericPassword: jest.fn().mockResolvedValue(null),
  setGenericPassword: jest.fn().mockResolvedValue(undefined),
  resetGenericPassword: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../src/controller/miApp.controller', () => ({
  signIn: jest.fn(),
}));

describe('SignInScreen with AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log in successfully and save token and user data', async () => {
    // Mockear respuesta de la API
    signIn.mockResolvedValue({
      token: 'mocked-token',
      user: { email: 'test@example.com', name: 'Test User' },
    });

    const { getByTestId } = render(
      <AuthProvider>
        <SignInScreen navigation={{ navigate: jest.fn() }} />
      </AuthProvider>
    );

    // Interactuar con los inputs
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const loginButton = getByTestId('Login');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'Securep@ss2');
    screen.debug();
    fireEvent.press(loginButton);

    // Validar que signIn fue llamado con los argumentos correctos
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Securep@ss2',
      });
    });

    // Validar que los datos se guardaron usando Keychain
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'username',
      'mocked-token',
      { service: 'token' }
    );
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'username',
      JSON.stringify({ email: 'test@example.com', name: 'Test User' }),
      { service: 'user' }
    );
  });
});

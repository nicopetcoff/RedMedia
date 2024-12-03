import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react-native';
import SignInScreen from '../src/screens/SignInScreen';
import { useToggleContext } from '../src/context/AuthProvider';

jest.mock('../src/context/AuthProvider', () => ({
  useToggleContext: jest.fn(),
}));

const mockNavigation = { navigate: jest.fn() };

beforeEach(() => {
  useToggleContext.mockReturnValue({ login: jest.fn() });
});

describe('SignInScreen Component - Validations', () => {
  it('shows error for invalid email format', async () => {
    render(<SignInScreen navigation={mockNavigation} />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('email'), 'invalidemail');
    });
    expect(screen.getByTestId('error-email').props.children).toBe('Email must be well-formed');
  });

  it('shows error for empty password', async () => {
    render(<SignInScreen navigation={mockNavigation} />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('password'), '');
    });
    expect(screen.getByTestId('error-password').props.children).toBe('Password is required');
  });

  it('shows error for password less than 8 characters', async () => {
    render(<SignInScreen navigation={mockNavigation} />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('password'), 'Aa1!');
    });
    expect(screen.getByTestId('error-password').props.children).toBe('Password must be at least 8 characters');
  });

  it('accepts valid email and password', async () => {
    const loginMock = jest.fn();
    useToggleContext.mockReturnValue({ login: loginMock });

    render(<SignInScreen navigation={mockNavigation} />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('email'), 'test@example.com');
      fireEvent.changeText(screen.getByTestId('password'), 'Aa1!2345');
    });
    await act(async () => {
      fireEvent.press(screen.getByTestId('Login'));
    });

    expect(loginMock).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'Aa1!2345',
    });
  });
});

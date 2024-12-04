import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react-native';
import SignUpScreen from '../src/screens/SignUpScreen';
import { signUp } from '../src/controller/miApp.controller';

jest.mock('../src/controller/miApp.controller');

describe('SignUpScreen - Validations', () => {
  beforeEach(() => {
    signUp.mockReset();
  });

  // Tests para entradas inválidas (Nombre)
  it('shows error for name with less than 3 characters', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('name'), 'Jo');
    });
    expect(screen.getByTestId('error-name').props.children).toContain('Name must contain only letters and be 3 to 16 characters long');
  });

  it('shows error for name with more than 16 characters', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('name'), 'JohnJacobJingleheimerSchmidt');
    });
    expect(screen.getByTestId('error-name').props.children).toContain('Name must contain only letters and be 3 to 16 characters long');
  });

  it('shows error for name containing numbers', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('name'), 'John123');
    });
    expect(screen.getByTestId('error-name').props.children).toContain('Name must contain only letters and be 3 to 16 characters long');
  });

  it('shows error for name containing special characters', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('name'), 'John@Doe');
    });
    expect(screen.getByTestId('error-name').props.children).toContain('Name must contain only letters and be 3 to 16 characters long');
  });

  // Tests para entradas inválidas (Apellido)
  it('shows error for last name with less than 3 characters', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('lastName'), 'Do');
    });
    expect(screen.getByTestId('error-lastName').props.children).toContain('Last name must contain only letters and be 3 to 16 characters long');
  });

  it('shows error for last name with more than 16 characters', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('lastName'), 'DoeJohnJacobJingleheimer');
    });
    expect(screen.getByTestId('error-lastName').props.children).toContain('Last name must contain only letters and be 3 to 16 characters long');
  });

  it('shows error for last name containing numbers', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('lastName'), 'Doe123');
    });
    expect(screen.getByTestId('error-lastName').props.children).toContain('Last name must contain only letters and be 3 to 16 characters long');
  });

  it('shows error for last name containing special characters', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('lastName'), 'Doe@123');
    });
    expect(screen.getByTestId('error-lastName').props.children).toContain('Last name must contain only letters and be 3 to 16 characters long');
  });

  // Tests para entradas inválidas (Nickname)
  it('shows error for nickname with less than 3 characters', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('nick'), 'JD');
    });
    expect(screen.getByTestId('error-nick').props.children).toContain('Nickname must contain only letters and be 3 to 16 characters long');
  });

  it('shows error for nickname with more than 16 characters', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('nick'), 'JohnnyDoe123456789');
    });
    expect(screen.getByTestId('error-nick').props.children).toContain('Nickname must contain only letters and be 3 to 16 characters long');
  });

  it('shows error for nickname containing numbers', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('nick'), 'JD123');
    });
    expect(screen.getByTestId('error-nick').props.children).toContain('Nickname must contain only letters and be 3 to 16 characters long');
  });

  it('shows error for nickname containing special characters', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('nick'), 'JD@Doe');
    });
    expect(screen.getByTestId('error-nick').props.children).toContain('Nickname must contain only letters and be 3 to 16 characters long');
  });

  it('shows error for invalid email', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('email'), 'invalidemail');
    });
    expect(screen.getByTestId('error-email').props.children).toBe('Email must be well-formed');
  });

  it('shows error for empty name', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('name'), '');
    });
    expect(screen.getByTestId('error-name').props.children).toBe('Name is required');
  });

    it('shows error for empty lastName', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('lastName'), '');
    });
    expect(screen.getByTestId('error-lastName').props.children).toBe('Last name is required');
    });

    it('shows error for empty Nick Name', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('nick'), '');
    });
    expect(screen.getByTestId('error-nick').props.children).toBe('Nickname is required');
        });

      it('shows error for password less than 8 characters', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('password'), 'Aa1!');
    });
    expect(screen.getByTestId('error-password').props.children).toBe('Password must be at least 8 characters');
  });

  it('shows error for password greater than 16 characters', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('password'), 'Aa1!23456789012345');
    });
    expect(screen.getByTestId('error-password').props.children).toBe('Password must be at most 16 characters');
  });

  it('shows error for password without uppercase letters', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('password'), 'aa1!2345');
    });
    expect(screen.getByTestId('error-password').props.children).toBe('Password must include at least one uppercase letter, one lowercase letter, one special character, and at least two non-consecutive numbers');
  });

  it('shows error for password without lowercase letters', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('password'), 'AA1!2345');
    });
    expect(screen.getByTestId('error-password').props.children).toBe('Password must include at least one uppercase letter, one lowercase letter, one special character, and at least two non-consecutive numbers');
  });

  it('shows error for password without a special character', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('password'), 'Aa123456');
    });
    expect(screen.getByTestId('error-password').props.children).toBe('Password must include at least one uppercase letter, one lowercase letter, one special character, and at least two non-consecutive numbers');
  });

  it('shows error for password without two non-consecutive numbers', async () => {
    render(<SignUpScreen />);
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('password'), 'Aa1!1123');
    });
    expect(screen.getByTestId('error-password').props.children).toBe('Password must include at least one uppercase letter, one lowercase letter, one special character, and at least two non-consecutive numbers');
  });
});

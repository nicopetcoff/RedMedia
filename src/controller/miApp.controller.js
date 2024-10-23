import urlWebServices from "./webServices";
import { useSelector } from 'react-redux';

export const getPosts = async function () {
  let url = urlWebServices.getPosts;

  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los posts: " + response.status);
    }

    let data = await response.json();
    return data;  // Aquí debería devolver los datos del backend.
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const signUp = async (userData) => {
  let url = urlWebServices.signUp;

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        nick: userData.nick,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al registrar el usuario: " + response.status);
    }

    let data = await response.json();
    return data;

  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const signIn = async (userData) => {
  let url = urlWebServices.signIn;  // URL para el endpoint de inicio de sesión

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al iniciar sesión: " + response.status);
    }

    let data = await response.json();
    return data;

  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Función nueva añadida
export const sendPasswordResetEmail = async (email) => {
  let url = urlWebServices.passwordReset;

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el correo de recuperación: " + response.status);
    }

    let data = await response.json();
    return data;

  } catch (error) {
    console.error("Error al enviar el correo de recuperación:", error);
    throw error;
  }
};
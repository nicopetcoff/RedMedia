import urlWebServices from "./webServices";

// Función para obtener los posts
export const getPosts = async function () {
  let url = urlWebServices.getPosts;
  console.log("url", url);

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
    console.log("esto trae", data);
    return data;  // Aquí debería devolver los datos del backend.
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Nueva función para enviar los datos de registro al backend
export const signUp = async (userData) => {
  let url = urlWebServices.signUp;  // URL para el endpoint de registro

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',  // Aseguramos que el backend interprete el cuerpo como JSON
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        nick: userData.nick, // El backend espera este campo como 'nick'
      }),
    });

    if (!response.ok) {
      throw new Error("Error al registrar el usuario: " + response.status);
    }

    let data = await response.json();
    console.log("Respuesta del servidor:", data);
    return data;  // Devolvemos la respuesta del servidor

  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const signIn = async (userData) => {
  let url = urlWebServices.signIn;  // URL para el endpoint de inicio de sesión
  console.log("URL de inicio de sesión:", url);

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',  // Añadir este encabezado para que el backend interprete el JSON
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),  // Convertimos los datos del usuario a formato JSON
    });

    if (!response.ok) {
      throw new Error("Error al iniciar sesión: " + response.status);
    }

    let data = await response.json();
    console.log("Respuesta del servidor:", data);
    return data;  // Aquí se devuelven los datos del backend (como el token)

  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const publishPost = async (postData) => {
  try {
    let url = urlWebServices.postPost;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      return { success: true, message: 'Post published successfully' };
    } else {
      return { success: false, message: 'Failed to publish post' };
    }
  } catch (error) {
    console.error('Error publishing post:', error);
    return { success: false, message: 'Failed to connect to backend' };
  }
};
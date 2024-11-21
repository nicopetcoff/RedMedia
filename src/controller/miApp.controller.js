import urlWebServices from './webServices';
import {useSelector} from 'react-redux';

export const getPosts = async function () {
  let url = urlWebServices.getPosts;

  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los posts: ' + response.status);
    }

    let data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async userData => {
  let url = urlWebServices.signUp;

  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userData),
    });

    let data = await response.json();
    if (data.status === 400) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async userData => {
  let url = urlWebServices.signIn;

  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });

    let data = await response.json();
    if (data.status === 400) {
      throw data;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendPasswordResetEmail = async email => {
  let url = urlWebServices.passwordReset;

  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({email}),
    });

    let data = await response.json();
    if (data.status === 404) {
      throw data;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async token => {
  let url = urlWebServices.getProfile;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const publishPost = async (postData, token) => {
  try {
    let url = urlWebServices.postPost;

    const formData = new FormData();

    // Agregar datos del post
    formData.append('title', postData.title);
    formData.append('description', postData.description);
    formData.append('location', postData.location);
    formData.append('user', postData.user);

    // Agregar imágenes
    postData.images.forEach((imageUri, index) => {
      let localUri = imageUri;
      let filename = localUri.split('/').pop();

      // Extraer la extensión del archivo
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image/jpeg`;

      formData.append('images', {
        uri: localUri,
        name: filename,
        type,
      });
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'x-access-token': token,
      },
      body: formData,
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Post published successfully',
        data: responseData.data,
      };
    } else {
      throw new Error(responseData.message || 'Failed to publish post');
    }
  } catch (error) {
    console.error('Error en publishPost:', error);
    return {
      success: false,
      message: error.message || 'Error connecting to server',
    };
  }
};

export const getAds = async () => {
  let url = urlWebServices.getAds;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los anuncios: ' + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async token => {
  let url = urlWebServices.getUsers;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-access-token': token,
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los usuarios: ' + response.status);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error en getUsers:', error);
    throw error;
  }
};

export const updateUserProfile = async (userData, token) => {
  let url = urlWebServices.updateUserProfile;

  try {
    const formData = new FormData();

    if (userData.avatar) {
      const imageUri = userData.avatar;
      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('avatar', {
        uri: imageUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    // Agregar otros campos si existen
    if (userData.nombre) formData.append('nombre', userData.nombre);
    if (userData.bio) formData.append('bio', userData.bio);

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'x-access-token': token,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Error response:', errorData);
      throw new Error(errorData.message || 'Error updating profile');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const handleFollowUser = async function (userId, token, isFollowing) {
  // Construir la URL reemplazando el parámetro dinámico
  const baseUrl = urlWebServices.followUser;
  const url = baseUrl.replace(':id', userId);
  
  console.log('URL final:', url); // Para debug

  try {
    let response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({
        action: isFollowing ? 'unfollow' : 'follow',
      }),
    });

    let data = await response.json();
    console.log('Follow response:', data); // Para debug

    if (!response.ok) {
      throw new Error(
        data.message || 'Error al seguir/dejar de seguir al usuario',
      );
    }

    return data;
  } catch (error) {
    console.error('Error en handleFollowUser:', error);
    throw error;
  }
};

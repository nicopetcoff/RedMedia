const urlApi = 'http://10.0.2.2:4000/'; // Para Android Emulator
// const urlApi = "http://[TU_IP_LOCAL]:4000/";  // Para dispositivos reales o iOS
console.log('url', urlApi);

const urlWebServices = {
  getPosts: urlApi + "api/posts",         // Ruta para obtener los posts
  signUp: urlApi + "api/users/signup",    // Nueva ruta para registrar usuarios
  signIn: urlApi + "api/users/singin",    // Nueva ruta para iniciar sesión
  passwordReset: urlApi + 'api//password-reset/request',
  getNotifications: urlApi + "api/users/notificaciones", // Ruta para obtener las notificaciones
};

export default urlWebServices;

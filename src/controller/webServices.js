const urlApi = "http://10.0.2.2:4000/"; // Para Android Emulator
// const urlApi = "http://[TU_IP_LOCAL]:4000/";  // Para dispositivos reales o iOS
console.log("url", urlApi);

const urlWebServices = {
  getPosts: urlApi + "api/posts",         // Ruta para obtener los posts
  signUp: urlApi + "api/users/signup",    // Nueva ruta para registrar usuarios
  signIn: urlApi + "api/users/singin",    // Nueva ruta para iniciar sesión
  postPost: urlApi + "api/post",          //Ruta para publicar un post
  searchUsers: urlApi +"api/users"        //Ruta para buscar los usuarios por nick
};

export default urlWebServices;
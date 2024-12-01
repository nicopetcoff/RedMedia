const urlApi = 'https://backend-redmedia.onrender.com/'; // Para producción
//const urlApi = 'http://10.0.2.2:4000/'; // Para Android Emulator
// const urlApi = "http://[TU_IP_LOCAL]:4000/";  // Para dispositivos reales o iOS

const urlWebServices = {
  // Auth & Users
  signUp: urlApi + "api/users/register",
  signIn: urlApi + "api/users/singin",
  getProfile: urlApi + "api/users/me",
  updateProfileImage: urlApi + "api/users/updateProfileImage",
  getNotifications: urlApi + "api/users/notificaciones",
  getUsers: urlApi + "api/users",
  updateUserProfile: urlApi + "api/users/me",
  googleLogin: urlApi + "api/users/google",
  followUser: urlApi + "api/users/:id/follow",
  searchUsers: urlApi + 'api/users/search',
  // Posts
  getPosts: urlApi + 'api/posts',
  getFollowingPosts: urlApi + 'api/posts/following',
  postPost: urlApi + 'api/posts/crear',
  interactWithPost: urlApi + 'api/posts/:id/interactions',
  


  // Mail
  passwordReset: urlApi + 'api/mail',

  // Ads
  getAds: urlApi + 'api/ads',
};

export default urlWebServices;

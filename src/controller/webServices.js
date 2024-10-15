const urlApi = "http://10.0.2.2:4000/"; // Para Android Emulator
// const urlApi = "http://[TU_IP_LOCAL]:4000/";  // Para dispositivos reales o iOS
console.log("url", urlApi);

const urlWebServices = {
  getPosts: urlApi + "api/posts",
};

export default urlWebServices;
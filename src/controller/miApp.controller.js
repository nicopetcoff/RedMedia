import urlWebServices from "./webServices";

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
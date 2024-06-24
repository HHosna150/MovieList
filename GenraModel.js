import axios from "axios";

export const getGenres = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
        params: {
          language: "en",
        },
      }
    );

    return response.data;
  } catch (e) {
    throw e;
  }
};

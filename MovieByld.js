import axios from "axios";

export const getMovieById = async (movieIds) => {
  try {
    const data = await Promise.all(
      movieIds.map(async (id) => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
            params: {
              language: "en-US",
            },
          }
        );
        return response.data;
      })
    );

    return data;
  } catch (e) {
    throw e;
  }
};

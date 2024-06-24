import axios from "axios";

export const getMovieByGenre = async (genre_id, page) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
        params: {
          language: "en-US",
          sort_by: "popularity.desc",
          with_genres: genre_id,
          page: page,
        },
      }
    );

    return response.data;
  } catch (e) {
    throw e;
  }
};

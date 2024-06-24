import axios from "axios";
import { MovieCard } from "../dtos/MovieDto.js";

export const getSearchMovie = async (page, query) => {
  const data = [];

  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
        params: {
          language: "en-US",
          query: query,
          page: page,
        },
      }
    );

    /* Data Cleaning */
    const { results, total_pages } = response.data;

    results.map((movie) => {
      data.push(new MovieCard(movie.title, movie.poster_path, movie.id));
    });

    return { movies: data, total_pages: total_pages };
  } catch (e) {
    throw e;
  }
};

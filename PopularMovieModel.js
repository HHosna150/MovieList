import axios from "axios";
import { MovieCard } from "../dtos/MovieDto.js";

export const getPopularMovie = async (pageNumber) => {
  const movieList = [];

  try {
    // Fetch popular movies from the API
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
        params: {
          language: "en-US",
          page: pageNumber,
        },
      }
    );

    /* Clean and structure fetched data */
    const { results, total_pages } = response.data;

    results.forEach((movie) => {
      movieList.push(new MovieCard(movie.title, movie.poster_path, movie.id));
    });

    return { movies: movieList, total_pages: total_pages };
  } catch (error) {
    throw error;
  }
};

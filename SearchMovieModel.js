import axios from "axios";
import { MovieCard } from "../dtos/MovieDto.js";

export const getSearchMovie = async (pageNum, searchTerm) => {
  const movieList = [];

  try {
    // Fetch movies matching the search query
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
        params: {
          language: "en-US",
          query: searchTerm,
          page: pageNum,
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

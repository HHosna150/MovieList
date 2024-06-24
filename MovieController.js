import { getGenres } from "../models/GenreModel.js";
import { getPopularMovie } from "../models/PopularMovieModel.js";
import { getSearchMovie } from "../models/SearchMovieModel.js";
import { getMovieByGenre } from "../models/GenreMovieModel.js";
import { getMovieDetail } from "../models/MovieInfoModel.js";
import { MovieCard } from "../dtos/MovieDto.js";
import { getMovieById } from "../models/MovieById.js";

export const getMovieByIdController = async (movieIds) => {
  const movies = [];
  const data = await getMovieById(movieIds);

  data.map((movie) => {
    movies.push(new MovieCard(movie.title, movie.poster_path, movie.id));
  });

  return movies;
};

export const getGenreController = async () => {
  const data = await getGenres();
  const { genres } = data;
  return genres;
};

export const getPopularMovieController = async (page) => {
  return await getPopularMovie(page);
};

export const getSearchMovieController = async (page, query) => {
  return await getSearchMovie(page, query);
};

export const getGenreMovieController = async (genre_id, page) => {
  const movies = [];
  const data = await getMovieByGenre(genre_id, page);

  /* Data Cleaning */
  const { results, total_pages } = data;

  results.map((movie) => {
    movies.push(new MovieCard(movie.title, movie.poster_path, movie.id));
  });

  return { movies: movies, total_pages: total_pages };
};

export const getMovieDetailController = async (id) => {
  return await getMovieDetail(id);
};

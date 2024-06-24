import axios from "axios";
import { MovieDetail } from "../dtos/MovieDto.js";

export const getMovieDetail = async (id) => {
  try {
    const details = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    const credits = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    /* Data Parsing and Cleaning */

    /* Details */
    const {
      backdrop_path,
      budget,
      genres /* array */,
      original_language,
      original_title,
      overview,
      poster_path,
      release_date,
      revenue,
      runtime,
      spoken_languages,
      status,
      tagline,
      title,
    } = details.data;

    const genres_name = genres.map((genre) => genre.name);
    const genre = genres_name.join(", ");
    const release_year = new Date(release_date).getFullYear();
    const formatted_runtime = formatRuntime(runtime);

    const language = spoken_languages.find(
      (language) => language.iso_639_1 === original_language
    );
    const language_name = language.english_name;

    /* Credits */

    const { cast, crew } = credits.data;

    const filtered_cast = filterCast(cast);
    const director = filterDirector(crew);

    const cleaned_data = new MovieDetail(
      {
        backdrop_path: backdrop_path,
        budget: budget,
        genres: genre,
        language: language_name,
        original_title: original_title,
        overview: overview,
        poster_path: poster_path,
        release_date: release_date,
        release_year: release_year,
        runtime: formatted_runtime,
        revenue: revenue,
        status: status,
        tagline: tagline,
        title: title,
      },
      filtered_cast,
      director
    );

    return cleaned_data;
  } catch (e) {
    throw e;
  }
};

const formatRuntime = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};

const filterCast = (cast) => {
  return cast.slice(0, 9).map((member) => ({
    name: member.name,
    profile_path: member.profile_path,
    character: member.character,
  }));
};

const filterDirector = (crew) => {
  const director = crew.find((member) => member.job === "Director");
  return director
    ? { name: director.name, profile_path: director.profile_path }
    : null;
};

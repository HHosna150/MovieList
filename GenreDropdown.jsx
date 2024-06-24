import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./GenreDropdown.css";

const GenreDropdown = ({ fetchMoviesByGenre }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movie/genre");
        setGenres(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchGenre();
  }, []);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className="dropdown-wrapper">Genre</Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu">
          {genres.map((genre) => {
            return (
              <Dropdown.Item
                key={genre.id}
                onClick={() => fetchMoviesByGenre(genre.id)}
                className="dropdown-item"
              >
                {genre.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default GenreDropdown;

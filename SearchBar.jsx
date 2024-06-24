import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = ({ fetchMoviesBySearch, fetchPopularMovie }) => {
  // Handle input change
  const handleChange = (e) => {
    const { value } = e.target;
    if (value.trim() !== "") {
      fetchMoviesBySearch(value.trim()); // Fetch movies by search term
    } else {
      fetchPopularMovie(1); // Fetch popular movies if search term is empty
    }
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />

      <input
        type="text"
        placeholder="Search for movies..."
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = ({ fetchMoviesBySearch, fetchPopularMovie }) => {
  const handleChange = (value) => {
    if (value !== "") {
      fetchMoviesBySearch(value);
    } else {
      fetchPopularMovie(1);
    }
  };

  return (
    <>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />

        <input
          placeholder="Type to search..."
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default SearchBar;

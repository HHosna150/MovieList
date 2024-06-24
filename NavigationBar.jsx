import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { RiMovie2Fill as Logo } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.css";
import "./NavigationBar.css";
import SearchBar from "./SearchBar";

const NavigationBar = ({ fetchMoviesBySearch, fetchPopularMovie }) => {
  return (
    <>
      <Navbar className="navbar-wrapper">
        <Navbar.Brand href="/" className="brand-wrapper">
          Starry Night Movie
          <Logo size={75} id="logo" />
        </Navbar.Brand>
        <SearchBar
          fetchMoviesBySearch={fetchMoviesBySearch}
          fetchPopularMovie={fetchPopularMovie}
        />
      </Navbar>
    </>
  );
};

export default NavigationBar;

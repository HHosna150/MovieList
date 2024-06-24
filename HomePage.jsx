import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import NavigationBar from "../components/NavigationBar";
import GenreDropdown from "../components/GenreDropdown";
import MoviePagination from "../components/MoviePagination";
import MovieCard from "../components/MovieCard";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPopularMovies(page);
  }, [page]); // Dependency added to update movies when page changes

  const fetchPopularMovies = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/movie/popular?page=${page}`
      );

      const { movies, total_pages } = response.data;
      setMovies(movies);
      setTotalPages(total_pages);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const fetchMoviesBySearch = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/movie/search?query=${query}&page=${page}`
      );
      const { movies, total_pages } = response.data;
      setMovies(movies);
      setTotalPages(total_pages);
    } catch (error) {
      console.error("Error fetching movies by search:", error);
    }
  };

  const fetchMoviesByGenre = async (genre_id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/movie/genre-filter?genre_id=${genre_id}&page=${page}`
      );
      const { movies, total_pages } = response.data;
      setMovies(movies);
      setTotalPages(total_pages);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  };

  const handleBookmarkToggle = async (id, title, path) => {
    const url = `http://localhost:3000/movie/insert-movie?id=${id}&title=${title}&path=${path}`;
    try {
      await axios.post(url);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <>
      <NavigationBar
        fetchMoviesBySearch={fetchMoviesBySearch}
        fetchPopularMovie={() => fetchPopularMovies(1)} // Ensure fetchPopularMovie resets page to 1
      />
      <Container fluid="md">
        <Row className="mb-3">
          <Col md={3}>
            <GenreDropdown fetchMoviesByGenre={fetchMoviesByGenre} />
          </Col>
          <Col md={9} className="d-flex justify-content-end align-items-center">
            <Link to="/bookmark" className="text-decoration-none">
              <Button variant="dark" className="d-flex align-items-center">
                <CiBookmark size={25} style={{ backgroundColor: "#171717" }} />
                <span className="ms-2">Bookmarks</span>
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>

      <Container fluid="md">
        <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4">
          {movies.map((movie) => (
            <Col key={movie.id}>
              <MovieCard
                title={movie.title}
                poster_path={movie.poster_path}
                id={movie.id}
                handleBookmarkToggle={handleBookmarkToggle}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <Container fluid="md">
        <MoviePagination
          currentPage={page}
          setCurrentPage={setPage}
          totalPages={totalPages}
        />
      </Container>
    </>
  );
};

export default HomePage;

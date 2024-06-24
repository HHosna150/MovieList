import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Stack, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import GenreDropdown from "../components/GenreDropdown";
import MoviePagination from "../components/MoviePagination";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleBookmarkToggle = async (id, title, path) => {
    const url = `http://localhost:3000/movie/insert-movie?id=${id}&title=${title}&path=${path}`;
    try {
      await axios.post(url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPopularMovies(page);
  }, []);

  const fetchPopularMovies = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/movie/popular?quey=${page}`
      );

      const { movies, total_pages } = response.data;
      setMovies(movies);
      setTotalPages(total_pages);
    } catch (e) {
      console.error(e);
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

  return (
    <>
      <Stack direction="vertical">
        <NavigationBar
          fetchMoviesBySearch={fetchMoviesBySearch}
          fetchPopularMovie={fetchPopularMovies}
        />
        <Container fluid="md">
          <Row md={4}>
            <Col md={{ span: 1 }}>
              <GenreDropdown fetchMoviesByGenre={fetchMoviesByGenre} />
            </Col>
            <Col>
              <Link to="/bookmark">
                <Button variant="dark">
                  <CiBookmark
                    size={25}
                    style={{ backgroundColor: "#171717" }}
                  />
                  bookmarks
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>

        <Container fluid="md">
          <Row xl={3} xxl={4}>
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
      </Stack>
    </>
  );
};

export default HomePage;

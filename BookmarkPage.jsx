import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { Container, Row, Col } from "react-bootstrap";
import BookmarkCard from "../components/BookmarkCard";

const BookmarkPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/user`);

      const data = response.data;
      setMovies(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    const url = `http://localhost:3000/movie/delete-movie/${id}`;
    try {
      await axios.delete(url);
      fetchMovies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <NavigationBar />

      <Container fluid="md">
        <Row xl={3} xxl={4}>
          {movies.map((movie) => (
            <Col key={movie.movieId}>
              <BookmarkCard
                title={movie.movieTitle}
                poster_path={movie.urlPath}
                id={movie.movieId}
                handleDelete={handleDelete}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default BookmarkPage;

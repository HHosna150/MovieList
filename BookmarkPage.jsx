import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { Container, Row, Col } from "react-bootstrap";
import BookmarkCard from "../components/BookmarkCard";

const BookmarkPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []); // Empty dependency array ensures fetchMovies is called only once on component mount

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user`);
      setMovies(response.data); // Directly set response data to movies state
    } catch (error) {
      console.error("Error fetching bookmarked movies:", error);
    }
  };

  const handleDelete = async (id) => {
    const url = `http://localhost:3000/movie/delete-movie/${id}`;
    try {
      await axios.delete(url);
      fetchMovies(); // Refresh movies after successful deletion
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  return (
    <>
      <NavigationBar />

      <Container fluid="md">
        <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4">
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

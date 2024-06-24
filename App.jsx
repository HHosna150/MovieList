import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieCarousel from "./components/MovieCarousel";
import NaviBar from "./components/NaviBar";
import { Stack } from "react-bootstrap";
import MovieCard from "./components/MovieCard";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Favourite from "./components/Favourite";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourite, setFavourite] = useState([]);

  const addFavourite = (item) => {
    setFavourite((prevItem) => [...prevItem, item]);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get("http://localhost:3000/movies");
      setMovies(response.data.results);
    };
    fetchMovies();
  }, []);

  return (
    <>
      <Stack direction="vertical" gap={5}>
        <Row>
          <Col md="auto">
            <Favourite favourites={favourite} />
          </Col>
          <Col>
            <NaviBar />
          </Col>
        </Row>

        <MovieCarousel movies={movies} />

        <Container fluid style={{ padddingTop: "80px" }}>
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "25px",
            }}
          >
            Recently Updated
          </h2>
          <Row>
            {movies.map((movie) => (
              <Col key={movie.id} style={{ padding: "20px" }}>
                <MovieCard movie={movie} addFavourite={addFavourite} />
              </Col>
            ))}
          </Row>
        </Container>
      </Stack>
    </>
  );
};

export default App;

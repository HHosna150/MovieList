import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./MovieCard.css"; // Assuming you have additional styles in this file

const MovieCard = ({ title, poster_path, id, handleBookmarkToggle }) => {
  const path = poster_path
    ? `https://image.tmdb.org/t/p/original${poster_path}`;

  const handleBookmarkClick = () => {
    handleBookmarkToggle(id, title, poster_path);
  };

  return (
    <Card className="movie-card" style={{ marginBottom: "1.5rem", border: "none" }}>
      <Link to={`/movie/${id}`}>
        <LazyLoadImage
          src={path}
          alt={title}
          effect="blur"
          className="movie-image"
        />
      </Link>
      <Container className="movie-details">
        <Row className="justify-content-between align-items-center">
          <Col md={8}>
            <p className="movie-title">{title}</p>
          </Col>
          <Col md={4} className="d-flex justify-content-end">
            <Button
              id="add-btn"
              variant="dark"
              onClick={handleBookmarkClick}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default MovieCard;

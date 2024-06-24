import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Placeholder,
  Row,
  Col,
} from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import noimage from "../assets/images/no-image.png";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./MovieCard.css";

const MovieCard = ({
  title,
  poster_path,
  id,
  isBookmarked,
  handleBookmarkToggle,
}) => {
  const path = `https://image.tmdb.org/t/p/original${poster_path}`;

  return (
    <>
      <Link to={`/movie/${id}`}>
        <Card
          style={{ width: "18rem", marginBottom: "1.5rem", border: "none" }}
        >
          {poster_path === null ? (
            <LazyLoadImage
              src={noimage}
              placeholderSrc={path}
              effect="blur"
              className="movie-image"
            />
          ) : (
            <LazyLoadImage
              src={path}
              placeholderSrc={path}
              effect="blur"
              className="movie-image"
            />
          )}
        </Card>
      </Link>

      <Container>
        <Row>
          <Col md={{ span: 8 }}>
            <p>{title}</p>
          </Col>
          <Col>
            <Button
              id="add-btn"
              onClick={() => handleBookmarkToggle(id, title, poster_path)}
            >
              add
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MovieCard;



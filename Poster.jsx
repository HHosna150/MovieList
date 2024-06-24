import React from "react";
import { Container } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Poster.css";

const Poster = ({ detail }) => {
  const { poster_path } = detail;

  const posterUrl = `https://image.tmdb.org/t/p/original${poster_path}`;

  return (
    <Container className="poster-container">
      <LazyLoadImage
        src={posterUrl}
        effect="blur"
        width={300}
        alt="Movie Poster"
        className="poster-image"
      />
    </Container>
  );
};

export default Poster;


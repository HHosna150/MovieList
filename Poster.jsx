import React from "react";
import { Container } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Poster.css";

const Poster = ({ detail, director }) => {
  const { backdrop_path, poster_path } = detail;

  const poster = `https://image.tmdb.org/t/p/original${poster_path}`;
  const backdrop = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <>
      <Container className="info-page">
        <LazyLoadImage
          width={300}
          src={poster}
          effect="blur"
          style={{ borderRadius: "10" }}
        />
      </Container>
    </>
  );
};

export default Poster;

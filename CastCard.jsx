import React, { useState } from "react";
import { Card } from "react-bootstrap";
import noimage from "../assets/images/no-image.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const CastCard = ({ cast }) => {
  const { name, profile_path, character } = cast;

  const profile = `https://image.tmdb.org/t/p/original${profile_path}`;

  return (
    <>
      <Card
        style={{
          border: "none",
          width: "9rem",
          height: "auto",
          margin: "10px",
          fontSize: "15px",
        }}
      >
        {profile_path === null ? (
          <LazyLoadImage src={noimage} effect="blur" />
        ) : (
          <LazyLoadImage src={profile} effect="blur" />
        )}

        <Card.Body>
          <Card.Text>
            <b>{name}</b>
          </Card.Text>
          <Card.Text>{character}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CastCard;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Stack, Container, Row, Col } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import CastCard from "../components/CastCard";
import Poster from "../components/Poster";
import { RiMovie2Fill as Logo } from "react-icons/ri";
import "./MovieInfoPage.css";
import InfoPanel from "../components/InfoPanel";

const MovieInfoPage = () => {
  const [details, setDetail] = useState({});
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState({});
  const { id } = useParams();

  const handleBookmarkToggle = async (id, title, path) => {
    const url = `http://localhost:3000/movie/insert-movie?id=${id}&title=${title}&path=${path}`;
    try {
      await axios.post(url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/movie/detail/${id}`
        );
        const { details, cast, director } = response.data;
        setDetail(details);
        setCast(cast);
        setDirector(director);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetail();
  }, []);

  return (
    <>
      <Navbar className="nav-container">
        <Navbar.Brand href="/" className="b-wrapper">
          <Logo size={75} id="nv-logo" />
        </Navbar.Brand>
      </Navbar>
      <Container fluid>
        <Row>
          <Col md={{ span: 3 }}>
            <Poster detail={details} director={director} />
          </Col>
          <Col>
            <InfoPanel
              handleBookmarkToggle={handleBookmarkToggle}
              details={details}
              director={director}
              id={id}
            />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <h3>Top Billed Cast</h3>
          </Col>
        </Row>
      </Container>
      <Container className="cast-container">
        {cast.map((c) => (
          <div key={c.name}>
            <CastCard cast={c} />
          </div>
        ))}
      </Container>
    </>
  );
};

export default MovieInfoPage;

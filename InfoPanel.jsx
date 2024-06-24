import React from "react";
import { Button, Container, Row, Col, Stack } from "react-bootstrap";

const InfoPanel = ({ handleBookmarkToggle, details, director, id }) => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <h2>
              {details.title} ({details.release_year})
            </h2>
          </Col>
        </Row>
        <Stack gap={5}>
          <Row>
            <Col>
              <p>
                {details.release_date} - ({details.runtime}) - {details.genres}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>
                <em>{details.tagline}</em>
              </h6>
            </Col>
          </Row>
        </Stack>

        <Row>
          <Col>
            <h5>
              <b>Overview</b>
            </h5>
          </Col>
        </Row>
        <Stack gap={5}>
          <Row>
            <Col>
              <p>{details.overview}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Director: {director.name}</h5>
            </Col>
          </Row>
        </Stack>
      </Container>

      <Button
        id="add-btn"
        onClick={() =>
          handleBookmarkToggle(id, details.title, details.poster_path)
        }
      >
        add
      </Button>
    </>
  );
};

export default InfoPanel;

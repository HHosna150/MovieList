import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import "./MoviePagination.css";

const MoviePagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => currentPage + 1);
    }
  };

  return (
    <>
      <Row md={6}>
        <Col md={{ offset: 3 }}>
          {currentPage > 1 && (
            <Button onClick={handlePreviousPage} className="btn">
              Previous
            </Button>
          )}
        </Col>
        <Col className="text-wrapper">
          <p>
            {" "}
            Page {currentPage} of {totalPages}{" "}
          </p>
        </Col>
        <Col md={{ span: 1 }}>
          {currentPage < totalPages && (
            <Button onClick={handleNextPage} className="btn">
              Next
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};

export default MoviePagination;

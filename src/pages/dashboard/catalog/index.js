import React from "react";
import { Col, Row } from "reactstrap";

import MoviesList from "./components/movies-list";
import PerformancesList from "./components/performances-list";
import PlacesList from "./components/places-list";

const Catalog = ({ enableTab }) => {
  return (
    <>
      <Row>
        <Col lg="4">
          <MoviesList />
        </Col>
        <Col lg="4">
          <PerformancesList />
        </Col>
        <Col lg="4">
          <PlacesList />
        </Col>
      </Row>
    </>
  );
};

export default Catalog;

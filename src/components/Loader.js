import React from "react";
import classNames from "classnames";
import { Container, Row, Spinner } from "reactstrap";

const Loader = ({ className = "vh-50", loading = false, children }) => (
  <>
    {loading ? (
      <Container fluid className={classNames("d-flex", className)}>
        <Row className="justify-content-center align-self-center w-100 text-center">
          <Spinner color="primary" />
        </Row>
      </Container>
    ) : children}
  </>

);

export default Loader;

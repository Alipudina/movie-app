import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Header = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="text-center bg-dark text-white p-5 text-uppercase h3 mb-0">
          List of Movies from Database
        </Col>
      </Row>
    </Container>
  );
};

export default Header;

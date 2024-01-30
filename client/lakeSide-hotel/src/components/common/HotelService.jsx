import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "./Header";
import { FaClock } from "react-icons/fa";

const HotelService = () => {
  return (
    <Container>
      <Header title={"Our Services"} />
      <Row>
        <h4 className="text-center">
          Services at <span className="hotel-color">lakeSide - </span>Hotel
          <span className="gap-2">
            <FaClock /> - 24-Hour Front Desk
          </span>
        </h4>
      </Row>
      <hr />
      <Row></Row>
    </Container>
  );
};

export default HotelService;

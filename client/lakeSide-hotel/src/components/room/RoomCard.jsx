import React from "react";
import { Card, Col } from "react-bootstrap";

const RoomCard = ({ room }) => {
  return (
    <Col key={room.id} className="mb-4" xs={12}>
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrink-0 mr-3 mb-md-0">
            <Card.Img
              variant="top"
              src={`data:image/png;base64,${room.photo}`}
              alt="Room photo"
              style={{ width: "100%", maxWidth: "200px", height: "auto" }}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;

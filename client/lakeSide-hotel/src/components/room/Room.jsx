import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import RoomCard from "../room/RoomCard";
const Room = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  if (isLoading) {
    return <div>Loading rooms...</div>;
  }
  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / roomsPerPage);

  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;
    return filteredData
      .slice(startIndex, endIndex)
      .map((room) => <RoomCard key={room.id} room={room} />);
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <RoomFilter data={data} setFilteredData={setFilteredData} />
        </Col>
        <Col md={6} className="d-flex align-item-center justify-content-end">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageClick={handlePageChange}
          />
        </Col>
      </Row>
      <Row>{renderRooms()}</Row>

      <Row>
        <Col md={6} className="d-flex align-item-center justify-content-end">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageClick={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Room;

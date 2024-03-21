import React, { useEffect } from "react";
import { useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { deleteRoom } from "../utils/ApiFunctions";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { Col, Row } from "react-bootstrap";
import { FaEye, FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRoom] = useState([]);
  const [selectedRoomType, setSelectedRoomTypes] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessag] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllRooms();
      setRooms(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessag(error);
    }
  };

  useEffect(() => {
    if (selectedRoomType == "") {
      setFilteredRoom(rooms);
    } else {
      const filtered = rooms.filter(
        (room) => room.roomType == selectedRoomType
      );
      setFilteredRoom(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (roomId) => {
    try {
      const result = await deleteRoom(roomId);
      if (result === "") {
        setSuccessMessage(`Room No ${roomId} was deleted`);
      } else {
        console.error(`Error deleting room : ${result.message}`);
      }
    } catch (error) {
      setErrorMessag(error.errorMessage);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessag("");
    }, 3000);
  };

  const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
    const totalRooms =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(totalRooms / roomsPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {successMessage && (
          <p className="alert alert-success mt-5">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="alert alert-danger mt-5">{errorMessage}</p>
        )}
      </div>
      {isLoading ? (
        <p> Loading existing rooms</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Existing Rooms</h2>
            </div>

            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                <RoomFilter data={rooms} setFilteredData={setFilteredRoom} />
              </Col>

              <Col md={6} className="d-flex justify-content-end">
                <Link to={"/add-room"}>
                  <FaPlus /> Add Room
                </Link>
              </Col>
            </Row>

            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Room Type</th>
                  <th>Room Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.id} className="text-center">
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>{room.roomPrice}</td>
                    <td className="gap-2">
                      <Link to={`/edit-room/${room.id}`}>
                        <span className="btn btn-info">
                          <FaEye />
                          View
                        </span>
                        <span className="btn btn-warning">
                          <FaEdit />
                          Edit
                        </span>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(room.id)}
                      >
                        <FaTrashAlt />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <RoomPaginator
              currentPage={currentPage}
              totalPages={calculateTotalPages(
                filteredRooms,
                roomsPerPage,
                rooms
              )}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    </>
  );
};

export default ExistingRooms;

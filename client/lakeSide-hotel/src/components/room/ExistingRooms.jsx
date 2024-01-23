import React, { useEffect } from "react";
import { useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";

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

  const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
    const totalRooms =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(totalRooms / roomsPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return <div></div>;
};

export default ExistingRooms;

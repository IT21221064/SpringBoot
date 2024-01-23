import React from "react";
import { useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRoomes, setFilteredRoom] = useState([]);
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

  return <div></div>;
};

export default ExistingRooms;

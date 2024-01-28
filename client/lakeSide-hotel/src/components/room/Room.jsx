import React from "react";
import { useState } from "react";

const Room = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);
  const [flteredData, setFilteredData] = useState([]);

  return <div>Room</div>;
};

export default Room;

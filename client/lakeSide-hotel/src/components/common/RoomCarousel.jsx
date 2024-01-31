import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllRooms } from "../utils/ApiFunctions";

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="mt-5">Loading rooms...</div>;
  }
  if (errorMessage) {
    return <div className="text-danger mb-5 mt-5">Error : {errorMessage}</div>;
  }
  return (
    <section>
      <Link to={"/browse-all-rooms"} className="hotel-color text-center">
        Browse all rooms
      </Link>
    </section>
  );
};

export default RoomCarousel;

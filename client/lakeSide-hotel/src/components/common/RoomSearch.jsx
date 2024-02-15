import React, { useState } from "react";
import moment from "moment";
import { getAvailableRooms } from "../utils/ApiFunctions";

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);
    if (!checkIn.isValid() || !checkOut.inValid()) {
      setErrorMessage("Please, enter valid date range");
      return;
    }
    if (!checkOut.isSameOrAfter(checkIn)) {
      setErrorMessage("Check-In date must come before Check-Out date");
      return;
    }
    setIsLoading(true);
    getAvailableRooms(
      searchQuery.checkInDate,
      searchQuery.checkOutDate,
      searchQuery.roomType
    )
      .then((response) => {
        setAvailableRooms(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);
    if (checkIn.isValid() && checkOut.isValid()) {
      setErrorMessage("");
    }
  };

  const ClearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDateP: "",
      roomType: "",
    });
  };

  return <div>RoomSearch</div>;
};

export default RoomSearch;

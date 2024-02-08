import React from "react";
import { useState } from "react";

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
    room: { id: "" },
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
    bookingConfirmationCode: "",
  });
  const [isDeleted, setDeleted] = useState(false);
  const clearBookingInfo = {
    id: "",
    room: { id: "" },
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
    bookingConfirmationCode: "",
  };
  return <div>FindBooking</div>;
};

export default FindBooking;

import React from "react";
import { useState } from "react";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunctions";

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
    bookingId: "",
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
  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
    } catch (error) {
      setBookingInfo(clearBookingInfo);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError(error.response);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingInfo.bookingId);
      setDeleted(true);
      setBookingInfo(clearBookingInfo);
      setConfirmationCode("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div
        className="container mt-5 d-flex flex-column 
  justify-content-center align-items-center"
      >
        <h2>Find My Booking</h2>
        <form onSubmit={handleFormSubmit} className="col-md-6">
          <div className="input-group mb-3">
            <input
              className="form-control"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Enter the booking confirmation code"
            />
            <button className="btn btn-hotel input-group-text">
              Find Booking
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FindBooking;

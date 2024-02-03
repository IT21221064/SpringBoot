import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <div className="card card-body mt-5">
      <h4>Reservation Summary</h4>
      <p>
        FullName : <strong>{booking.guestName}</strong>
      </p>
      <p>
        Email : <strong>{booking.guestEmail}</strong>
      </p>
      <p>
        Check-In Date :{" "}
        <strong>{moment(booking.checkInDate).format("MM DD YYYY")}</strong>
      </p>
      <p>
        Check-Out Date :{" "}
        <strong>{moment(booking.checkOutDate).format("MM DD YYYY")}</strong>
      </p>
      <p>
        Number of Days:
        <strong>{numOfDays}</strong>
      </p>
      <div>
        <h5>Number of Guests</h5>
        <strong>
          Adult{booking.numberOfAdults > 1 ? "s" : ""} :{" "}
          {booking.numberOfAdults}
        </strong>
        <strong>Children : {booking.numberOfChildren}</strong>
      </div>
    </div>
  );
};

export default BookingSummary;

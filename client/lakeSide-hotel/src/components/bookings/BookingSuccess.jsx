import React from "react";
import { useNavigate } from "react-router-dom";

const BookingSuccess = () => {
  const location = useNavigate();
  const message = location.state?.message;
  const error = location.state?.error;
  return (
    <div className="container">
      <Header title="Booking Sucess" />
      <div className="mt-5">
        {message ? (
          <div>
            <h3 className="text-success">Booking Success !</h3>
            <p className="text-success">{message}</p>
          </div>
        ) : (
          <div>
            <h3 className="text-danger">Error Booking Room !</h3>
            <p className="text-success">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSuccess;

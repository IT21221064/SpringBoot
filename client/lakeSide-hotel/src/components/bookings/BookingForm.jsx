import React, { useState } from "react";
import { useEffect } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const BookingForm = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [booking, setBooking] = useState({
    guestName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: "",
    numberOfChildren: "",
  });

  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });

  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomPriceById(roomId);
      setRoomPrice(response.roomPrice);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate);
    const price = roomPrice ? roomPrice : 0;
    return diffInDays * price;
  };

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numberOfAdults);
    const childrenCount = parseInt(booking.numberOfChildren);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage("Check-out date must come before check-in date");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isGuestCountValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setIsValidated(true);
  };

  const handleBooking = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      setIsSubmitted(true);
      navigate("/", { state: { message: confirmationCode } });
    } catch (error) {
      setErrorMessage(error.message);
      navigate("/", { state: errorMessage });
    }
  };

  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col card-body mt-5">
            <h4 className="card carrd-title">Reserve Room</h4>
            <Form noValidate valited={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="guestName">Full Name:</Form.Label>
                <FormControl
                  required
                  type="text"
                  id="guestName"
                  name="guestName"
                  value={booking.guestName}
                  placeholder="Enter your full name"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="inavlid">
                  Please enter your fullname
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="guestEmail">Email :</Form.Label>
                <FormControl
                  required
                  type="email"
                  id="guestEmail"
                  name="guestEmail"
                  value={booking.guestEmail}
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="inavlid">
                  Please enter your email
                </Form.Control.Feedback>
              </Form.Group>

              <fieldset style={{ border: "2px" }}>
                <legend>Loading period</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="checkInDate">
                      Check-In Date :
                    </Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkInDate"
                      name="checkInDate"
                      value={booking.checkInDate}
                      placeholder="check-in date"
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="inavlid">
                      Please select a check-in-date
                    </Form.Control.Feedback>
                  </div>

                  <div className="col-6">
                    <Form.Label htmlFor="checkOutDate">
                      Check-In Date :
                    </Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkOutDate"
                      name="checkOutDate"
                      value={booking.checkOutDate}
                      placeholder="check-out date"
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="inavlid">
                      Please select a check-out-date
                    </Form.Control.Feedback>
                  </div>
                  {errorMessage && (
                    <p className="error-message text-danger">{errorMessage}</p>
                  )}
                </div>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;

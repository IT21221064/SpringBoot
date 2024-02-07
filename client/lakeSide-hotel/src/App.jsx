import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import ExistingRooms from "./components/room/ExistingRooms";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import EditRoom from "./components/room/EditRoom";
import AddRoom from "./components/room/AddRoom";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";
import RoomListing from "./components/room/RoomListing";
import Admin from "./components/admin/Admin";
import Checkout from "./components/bookings/Checkout";
import BookingSuccess from "./components/bookings/BookingSuccess";
import Bookings from "./components/bookings/Bookings";

function App() {
  return (
    <>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRooms />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/brows-all-rooms" element={<RoomListing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/book-room/:roomId" element={<Checkout />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/existing-bookings" element={<Bookings />} />
          </Routes>
        </Router>
        <Footer />
      </main>
    </>
  );
}

export default App;

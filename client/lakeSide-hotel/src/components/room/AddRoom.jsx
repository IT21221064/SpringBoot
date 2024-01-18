import React from "react";
import { useState } from "react";
import { addRoom } from "../utils/ApiFunctions";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomtype: "",
    roomPrice: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.taerget.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value.parseInt(value);
      } else {
        value = "";
      }
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(
        newRoom.photo,
        newRoom.roomtype,
        newRoom.roomPrice
      );
      if (success !== undefined) {
        setsuccessMessage("A new room was added to the database");
        setNewRoom({ photo: null, roomtype: "", roomPrice: "" });
        setImagePreview("");
        seterrorMessage("");
      } else {
        seterrorMessage("Error adding room");
      }
    } catch (error) {
      seterrorMessage(error.message);
    }
  };

  return (
    <>
      <section className="container,mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Add a New Room</h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddRoom;

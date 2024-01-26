import React, { useState } from "react";
import { useEffect } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { useParams, Link } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";

const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  const { roomId } = useParams();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateRoom(roomId, room);
      if (response.status == 200) {
        setsuccessMessage("Room updated successfully");
        const updateRoomData = await getRoomById(roomId);
        setRoom(updateRoomData);
        setImagePreview(updateRoomData.photo);
        seterrorMessage("");
      } else {
        seterrorMessage("Error updating room");
      }
    } catch (error) {
      console.error(error);
      seterrorMessage(error.message);
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImagePreview(roomData.photo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoom();
  }, [roomId]);

  return (
    <>
      <div className="container,mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Edit Room</h2>
            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  Room Type
                </label>
                <div>
                  <RoomTypeSelector
                    handleRoomInputChange={handleInputChange}
                    newRoom={room}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label">
                  Room Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  required
                  id="roomPrice"
                  name="roomPrice"
                  value={room.roomPrice}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Room Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={`data:image/jpeg;base64,${imagePreview}`}
                    alt="Preview Room Photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  />
                )}
              </div>
              <div className="d-grid d-md-flex mt-2">
                <Link
                  to={"/existing-rooms"}
                  className="btn btn-outline-info ml-5"
                >
                  Back
                </Link>
                <button type="submit" className="btn btn-outline-primary ml-5">
                  Edit Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRoom;

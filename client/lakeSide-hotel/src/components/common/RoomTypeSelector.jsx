import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomType, setRoomType] = useState([""]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomType(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };
  const handleAddNewRoomType = () => {
    if (newRoomType.trim() !== "") {
      setRoomType([...roomType, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };

  return (
    <>
      {roomType.length > 0 && (
        <div>
          <select
            id="roomType"
            name="roomType"
            value={newRoom.roomType}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewRoomTypeInput(true);
              } else {
                handleRoomInputChange(e);
              }
            }}
          >
            <option value="">-select a room type-</option>
            <option value={"Add New"}>Add New</option>
            {roomType.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div className="mt-2">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter a new room type"
                  className="form-control"
                  onChange={handleNewRoomTypeInputChange}
                  value={newRoomType}
                />
                <button
                  className="btn btn-hotel"
                  type="button"
                  onClick={handleAddNewRoomType}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomTypeSelector;

import React from "react";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateSlider = ({ onDateChange, onFilterChange }) => {
  const [dataRange, setDataRange] = useState({
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  });

  const handleSelect = (ranges) => {
    setDataRange(ranges.selection);
    onDateChange(ranges.selection.startDate, ranges.selection.endDate);
    onFilterChange(ranges.selection.startDate, ranges.selection.endDate);
  };

  const handleClearFilter = () => {
    setDataRange({
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    });
    onFilterChange(null, null);
  };

  return <div>DateSlider</div>;
};

export default DateSlider;

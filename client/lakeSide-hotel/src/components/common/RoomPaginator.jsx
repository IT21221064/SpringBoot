import React from "react";

const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return <div>RoomPaginator</div>;
};

export default RoomPaginator;

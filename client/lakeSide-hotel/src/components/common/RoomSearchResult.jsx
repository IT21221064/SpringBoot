import React, { useState } from "react";
import { Row, Button } from "react-bootstrap";
import RoomCard from "../room/RoomCard";
import RoomPaginator from "../common/RoomPaginator";

const RoomSearchResult = ({ results, onClearSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultPerPage = 3;
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / resultPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * resultPerPage;
  const endIndex = Math.min(startIndex + resultPerPage, totalResults);
  const paginatedResult = results.slice(startIndex, endIndex);

  return (
    <>
      {totalResults > 0 ? (
        <>
          <h5 className="text-center mt-5">Search Result</h5>
          <Row>
            {paginatedResult.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </Row>
          <Row className="mt-3">
            {totalPages > 1 && (
              <RoomPaginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
            <Button variant="secondary" onClick={onClearSearch}>
              Clear Search
            </Button>
          </Row>
        </>
      ) : (
        <p className="text-center mt-5">
          No rooms available for the selected criteria.
        </p>
      )}
    </>
  );
};

export default RoomSearchResult;

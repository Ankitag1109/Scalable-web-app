import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

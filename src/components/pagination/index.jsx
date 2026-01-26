import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
}) => {
  if (totalPages === 0) return null;

  const pages = [];

  // Sempre mostrar a primeira página
  pages.push(1);

  let startPage = Math.max(currentPage - 1, 2);
  let endPage = Math.min(currentPage + 1, totalPages - 1);

  // Ajuste caso esteja perto do início
  if (currentPage === 1) {
    endPage = Math.min(maxVisible - 1, totalPages - 1);
  }

  // Ajuste caso esteja perto do fim
  if (currentPage === totalPages) {
    startPage = Math.max(totalPages - (maxVisible - 2), 2);
  }

  // Adicionar ... se houver gap
  if (startPage > 2) pages.push("...");
  for (let i = startPage; i <= endPage; i++) pages.push(i);
  if (endPage < totalPages - 1) pages.push("...");

  // Sempre mostrar a última página se houver mais de uma
  if (totalPages > 1) pages.push(totalPages);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={handlePrev}
        className={`px-3 py-1 rounded-md border ${
          currentPage === 1
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-1 text-gray-500">
            …
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md border ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={handleNext}
        className={`px-3 py-1 rounded-md border ${
          currentPage === totalPages
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;

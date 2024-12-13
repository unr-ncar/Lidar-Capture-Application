import React from 'react';

interface FrostedPaginationProps {
  value: number;
  setValue: (value: number) => void;
  windowSize: number;
  totalItems: number;
}

export default function FrostedPagination({ value, setValue, windowSize, totalItems }: FrostedPaginationProps) {
  const totalPages = Math.ceil(totalItems / windowSize);

  const handleClick = (newValue: number) => {
    if (newValue >= 1 && newValue <= totalPages) {
      setValue(newValue);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`pagination-button ${value === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="frosted-pagination">
      <button onClick={() => handleClick(value - 1)} disabled={value === 1}>
        Previous
      </button>
      {renderPageNumbers()}
      <button onClick={() => handleClick(value + 1)} disabled={value === totalPages}>
        Next
      </button>
    </div>
  );
};
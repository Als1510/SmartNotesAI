import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      className="form-control mb-4"
      type="text"
      placeholder="Search notes..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;

import React from 'react';
import searchIcon from '../assets/test_search.svg';

const SearchBar = ({ onSearchChange }) => {
  return (
    <div className="search-container">
      <img src={searchIcon} alt="search" className="search-icon" style={{ width: 18, height: 18 }} />
      <input
        type="text"
        placeholder="Search Customers"
        className="search-input"
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

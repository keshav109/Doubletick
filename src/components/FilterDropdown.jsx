import React from 'react';
import filterIcon from '../assets/test_Filter.svg';

const FilterDropdown = ({ showFilters, toggleFilters }) => {
  return (
    <div className="filter-container">
      <button className="filter-button" onClick={toggleFilters}>
        <img src={filterIcon} alt="filter" style={{ width: 18, height: 18 }} />
        <span>Add Filters</span>
      </button>
      
      {showFilters && (
        <div className="filter-dropdown">
          <div className="filter-item">Filter 1</div>
          <div className="filter-item">Filter 2</div>
          <div className="filter-item">Filter 3</div>
          <div className="filter-item">Filter 4</div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;

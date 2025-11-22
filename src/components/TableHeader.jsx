import React from 'react';

const TableHeader = ({ sortConfig, onSort }) => {
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };
  
  return (
    <thead className="table-head">
      <tr>
        <th className="table-header">
          <input type="checkbox" className="checkbox" />
        </th>
        <th 
          className="table-header sortable" 
          onClick={() => onSort('name')}
        >
          Customer{renderSortIcon('name')}
        </th>
        <th 
          className="table-header sortable" 
          onClick={() => onSort('age')}
        >
          Age{renderSortIcon('age')}
        </th>
        <th 
          className="table-header sortable" 
          onClick={() => onSort('email')}
        >
          Email{renderSortIcon('email')}
        </th>
        <th 
          className="table-header sortable" 
          onClick={() => onSort('lastMessageAt')}
        >
          Last message sent at{renderSortIcon('lastMessageAt')}
        </th>
        <th 
          className="table-header sortable" 
          onClick={() => onSort('addedBy')}
        >
          Added by{renderSortIcon('addedBy')}
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;

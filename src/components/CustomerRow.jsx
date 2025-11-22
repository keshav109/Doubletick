import React from 'react';
import userIcon from '../assets/test_user.svg';
import { formatDate } from '../utils/dateFormatter';

const CustomerRow = ({ customer }) => {
  return (
    <tr className="table-row">
      <td className="table-cell">
        <input type="checkbox" className="checkbox" />
      </td>
      <td className="table-cell">
        <div className="customer-cell">
          <img
            src={customer.avatar}
            alt={customer.name}
            className="avatar"
          />
          <div>
            <div className="customer-name">{customer.name}</div>
            <div className="customer-phone">{customer.phone}</div>
          </div>
        </div>
      </td>
      <td className="table-cell">{customer.age}</td>
      <td className="table-cell">{customer.email}</td>
      <td className="table-cell">{formatDate(customer.lastMessageAt)}</td>
      <td className="table-cell">
        <div className="added-by-cell">
          <img src={userIcon} alt="user" style={{ width: 14, height: 14 }} />
          <span>{customer.addedBy}</span>
        </div>
      </td>
    </tr>
  );
};

export default CustomerRow;

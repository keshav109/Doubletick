import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="DoubleTick Logo" className="logo-image" style={{ width: '150px' }} />
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';

import LOGO from '../assets/logo.png';

const Header = () => {
  return (
    <div className='d-flex header justify-content-between align-items-center'>
      <Link to="/" className='text-decoration-none d-flex align-items-center'>
        <img src={LOGO} alt="logo" width={100} className="logo" />
        <span className='logo-name'>COIN</span>
      </Link>
      <div>
        <button className='connect-button'>Connect Wallet</button>
      </div>
    </div>
  );
};

export default Header;
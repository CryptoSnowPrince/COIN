import React from 'react';
import { Link } from 'react-router-dom';

import LOGO from '../assets/logo.png';

const Header = (props) => {
  return (
    <div className='d-flex header justify-content-between align-items-center'>
      <Link to="/" className='text-decoration-none d-flex align-items-center'>
        <img src={LOGO} alt="logo" width={100} className="logo" />
        <span className='logo-name'>COIN</span>
      </Link>
      <div>
        {!props.web3Provider ? (<button className='connect-button' onClick={props.connect}>Connect Wallet</button>)
          : (<button className='connect-button' onClick={props.disconnect}>{props.showAccountAddress}</button>)}
      </div>
    </div>
  );
};

export default Header;
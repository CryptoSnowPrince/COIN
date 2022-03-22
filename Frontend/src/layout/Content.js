import React from 'react';

import COIN1 from '../assets/coin1.png';
import COIN2 from '../assets/coin2.png';

const Content = (props) => {
  return (
    <div className='d-flex flex-column text-center content justify-content-around'>
      <div className="wrtext primary-color">
        (Please make sure you are visiting https://app.coin.com)
      </div>
      <div className='mt-4'>
        <input placeholder='Wallet Address' className='wallet-address-input' />
      </div>
      <div className='m-auto w-75'>
        <div className='compare-part d-flex justify-content-center mt-4'>
          <div className='p-4 border-right border-bottom' style={{ flex: 1 }}>
            <div className='primary-color'>Your Wallet</div>
            <div>{props.tokenBalance} (${props.tokenMarketCap}) <img src={COIN1}  className='coin1' width="60" style={{ marginTop: "-7px" }} alt='' />COIN</div>
            {/* <div>1,000 ($0) <img src={COIN1}  className='coin1' width="60" style={{ marginTop: "-7px" }} alt='' />COIN</div> */}
          </div>
          <div className='p-4 border-bottom' style={{ flex: 1 }}>
            <div className='primary-color'>Total Earned</div>
            <div>(${props.totalEarnedBusd}) <img src={COIN2}  className='coin2' width="40" style={{ marginTop: "-7px", marginRight: "10px" }} alt='' />BUSD</div>
            {/* <div>($0) <img src={COIN2}  className='coin2' width="40" style={{ marginTop: "-7px", marginRight: "10px" }} alt='' />BUSD</div> */}
          </div>
        </div>
      </div>
      <div className='mt-4 d-flex flex-column claim-part'>
        <div className='primary-color'>Rewords Not Claimed</div>
        <div className='mt-1'>(${props.rewardBusd}) <img src={COIN2} width="40" className='coin2' style={{ marginTop: "-7px", marginRight: "10px" }} alt='' />BUSD</div>
        {/* <div className='mt-1'>($0) <img src={COIN2} width="40" className='coin2' style={{ marginTop: "-7px", marginRight: "10px" }} alt='' />BUSD</div> */}
        <div><button className='claim-button mt-2' onClick={props.handleClaim}>Claim Manually</button></div>
      </div>
    </div>
  );
};

export default Content;
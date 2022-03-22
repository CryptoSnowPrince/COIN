import React, { useState } from 'react';

import COIN1 from '../assets/coin1.png';
import COIN2 from '../assets/coin2.png';

const Content = (props) => {
  const [walletForFetch, setWalletForFetch] = useState("");
  const [fetchState, setFetchState] = useState(false);
  return (
    <div className='d-flex flex-column text-center content justify-content-around'>
      <div className="wrtext primary-color">
        (Please make sure you are visiting https://app.coin.com)
      </div>
      <div className='mt-4'>
        <input
          placeholder='Wallet Address'
          className='wallet-address-input'
          value={walletForFetch}
          onChange={(e) => {
            if (props.web3.utils.isAddress(e.target.value) == true) {
              setFetchState(true);
              props.fetchData(e.target.value);
            } else {
              setFetchState(false);
            }

            // if (parseFloat(e.target.value) > props.balanceAEB) {
            //   alert(
            //     `Balance overflow! Your balance is ${props.balanceAEB}.`
            //   );
            //   setTokenAmount(props.balanceAEB);
            // } else if (
            //   parseFloat(e.target.value) >
            //   config.MAX_STAKE_AMOUNT_PER_USER_DIV_DECIMALS
            // ) {
            //   alert(
            //     `Max balance to stake per holder overflow! Max balance is ${config.MAX_STAKE_AMOUNT_PER_USER_DIV_DECIMALS}.`
            //   );
            //   setTokenAmount(
            //     config.MAX_STAKE_AMOUNT_PER_USER_DIV_DECIMALS
            //   );
            // } else {
            //   setTokenAmount(e.target.value);
            // }
          }} />
      </div>
      <div className='m-auto w-75'>
        <div className='compare-part d-flex justify-content-center mt-4'>
          <div className='p-4 border-right border-bottom' style={{ flex: 1 }}>
            <div className='primary-color'>Your Wallet</div>
            <div>{fetchState ? props.fetchtokenBalance : (props.web3Provider ? props.tokenBalance : 0)} (${props.web3Provider ? props.tokenMarketCap : 0}) <img src={COIN1} className='coin1' width="60" style={{ marginTop: "-7px" }} alt='' />COIN</div>
            {/* <div>1,000 ($0) <img src={COIN1}  className='coin1' width="60" style={{ marginTop: "-7px" }} alt='' />COIN</div> */}
          </div>
          <div className='p-4 border-bottom' style={{ flex: 1 }}>
            <div className='primary-color'>Total Earned</div>
            <div>(${props.web3Provider ? props.totalEarnedBusd : 0}) <img src={COIN2} className='coin2' width="40" style={{ marginTop: "-7px", marginRight: "10px" }} alt='' />BUSD</div>
            {/* <div>($0) <img src={COIN2}  className='coin2' width="40" style={{ marginTop: "-7px", marginRight: "10px" }} alt='' />BUSD</div> */}
          </div>
        </div>
      </div>
      <div className='mt-4 d-flex flex-column claim-part'>
        <div className='primary-color'>Rewords Not Claimed</div>
        <div className='mt-1'>(${props.web3Provider ? props.rewardBusd : 0}) <img src={COIN2} width="40" className='coin2' style={{ marginTop: "-7px", marginRight: "10px" }} alt='' />BUSD</div>
        {/* <div className='mt-1'>($0) <img src={COIN2} width="40" className='coin2' style={{ marginTop: "-7px", marginRight: "10px" }} alt='' />BUSD</div> */}
        <div><button className='claim-button mt-2' onClick={props.handleClaimManually}>Claim Manually</button></div>
      </div>
    </div>
  );
};

export default Content;
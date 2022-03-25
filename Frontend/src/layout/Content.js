import React, { useState } from "react";

import COIN1 from "../assets/coin1.png";
import COIN2 from "../assets/coin2.png";

const numberWithCommas = (x) => {
  return x.toLocaleString(undefined, { maximumFractionDigits: 3 });
};

const Content = (props) => {
  const [walletForFetch, setWalletForFetch] = useState("");
  const [fetchState, setFetchState] = useState(false);
  return (
    <div className="d-flex flex-column text-center content justify-content-around">
      <div className="wrtext primary-color">
        (Please make sure you are visiting https://app.coin.com)
      </div>
      <div className="mt-4">
        <input
          placeholder="Wallet Address"
          className="wallet-address-input"
          value={walletForFetch}
          onChange={(e) => {
            setWalletForFetch(e.target.value);
            if (props.web3.utils.isAddress(e.target.value) === true) {
              setFetchState(true);
              props.fetchData(e.target.value);
            } else {
              setFetchState(false);
            }
          }}
        />
      </div>
      <div className="m-auto w-75">
        <div className="compare-part d-flex justify-content-center mt-4">
          <div className="p-4 border-right border-bottom" style={{ flex: 1 }}>
            <div className="wrtext primary-color">Your Wallet</div>
            <div className="wrtext">
              {fetchState
                ? numberWithCommas(props.fetchtokenBalance)
                : props.web3Provider
                  ? numberWithCommas(props.tokenBalance)
                  : 0}{" "}
              ($
              {fetchState
                ? numberWithCommas(props.fetchtokenBalance * props.tokenMarketCap)
                : props.web3Provider
                  ? numberWithCommas(props.tokenBalance * props.tokenMarketCap)
                  : 0}
              ){" "}
              <img
                src={COIN1}
                className="coin1"
                width="60"
                style={{ marginTop: "-7px" }}
                alt=""
              />
              COIN
            </div>
          </div>
          <div className="p-4 border-bottom" style={{ flex: 1 }}>
            <div className="wrtext primary-color">Total Earned</div>
            <div className="wrtext">
              ($
              {fetchState
                ? props.fetchtotalEarnedBusd
                : props.web3Provider
                  ? props.totalEarnedBusd
                  : 0}
              ){" "}
              <img
                src={COIN2}
                className="coin2"
                width="40"
                style={{ marginTop: "-7px", marginRight: "10px" }}
                alt=""
              />
              BUSD
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 d-flex flex-column claim-part">
        <div className="wrtext primary-color">Rewords Not Claimed</div>
        <div className="wrtext mt-1">
          ($
          {fetchState
            ? props.fetchrewardBusd
            : props.web3Provider
              ? props.rewardBusd
              : 0}
          ){" "}
          <img
            src={COIN2}
            width="40"
            className="coin2"
            style={{ marginTop: "-7px", marginRight: "10px" }}
            alt=""
          />
          BUSD
        </div>
        <div>
          <button
            disabled={props.pendingTx}
            className="claim-button mt-2"
            onClick={props.handleClaimManually}
          >
            Claim Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;

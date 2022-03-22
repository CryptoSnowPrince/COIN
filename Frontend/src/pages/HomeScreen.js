import React, { useEffect, useState, useCallback, useReducer } from 'react';
import Web3Modal from "web3modal";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import Content from '../layout/Content';
import Footer from '../layout/Footer';

import config from "../contract/config";
import parcelforceABI from "../contract/abi/parcelforce.json";
import DividendDistributorABI from "../contract/abi/DividendDistributor.json";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: config.INFURA_ID, // required
    },
  },
};

let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
    theme: "dark",
  });
}

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
};

export const numberWithCommas = (x) => {
  return x.toLocaleString(undefined, { maximumFractionDigits: 5 });
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "RESET_WEB3_PROVIDER":
      return initialState;
    default:
      throw new Error();
  }
}

const web3 = new Web3(window.ethereum);
const parcelforceContract = new web3.eth.Contract(parcelforceABI, config.parcelforce[config.chainID]);
const DividendDistributorContract = new web3.eth.Contract(DividendDistributorABI, config.DividendDistributor[config.chainID]);

const Dashboard = () => {
  const [tokenBalance, setTokenBalance] = useState("0");
  const [tokenMarketCap, setTokenMarketCap] = useState("0");
  const [totalEarnedBusd, setTotalEarnedBusd] = useState("0");
  const [rewardBusd, setRewardBusd] = useState("0");

  const [fetchtokenBalance, setFetchTokenBalance] = useState("0");
  const [fetchtokenMarketCap, setFetchTokenMarketCap] = useState("0");
  const [fetchtotalEarnedBusd, setFetchTotalEarnedBusd] = useState("0");
  const [fetchrewardBusd, setFetchRewardBusd] = useState("0");

  const [pendingTx, setPendingTx] = useState("false");

  const [account, setAccount] = useState("");
  const [showAccountAddress, setShowAccountAddress] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider } = state;

  const connect = useCallback(async function () {
    console.log("connect wallet");
    try {
      const provider = await web3Modal.connect();
      if (window.ethereum) {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: config.chainHexID[config.chainID] }], // chainId must be in hexadecimal numbers
        });
      } else {
        alert(
          "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
        );
      }

      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const account = await signer.getAddress();
      const network = await web3Provider.getNetwork();
      const show_address =
        account.slice(0, 6) + "..." + account.slice(-4, account.length);
      setShowAccountAddress(show_address);
      setAccount(account);
      dispatch({
        type: "SET_WEB3_PROVIDER",
        provider,
        web3Provider,
        show_address,
        chainId: network.chainId,
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: config.chainHexID[config.chainID],
                rpcUrl: config.RpcURL[config.chainID],
              },
            ],
          });
        } catch (addError) {
          console.log(addError);
        }
      } else if (error.code === 4001) {
        console.log(error);
      }
      console.log(`${error}`);
    }
  }, []);

  const disconnect = useCallback(async function () {
    await web3Modal.clearCachedProvider();
    setShowAccountAddress(null);
    setAccount(null);
    dispatch({
      type: "RESET_WEB3_PROVIDER",
    });
  }, []);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  useEffect(() => {
    if (provider) {
      const handleAccountsChanged = (accounts) => {
        connect();
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
  }, [provider]);

  const init = async () => {
    console.log(`init`);
    try {
      const balance = await parcelforceContract.methods.balanceOf(account).call();
      const shares = await DividendDistributorContract.methods.shares(account).call();
      const rewardBusd = await DividendDistributorContract.methods.getUnpaidEarnings(account).call();
      setRewardBusd(numberWithCommas(Number(web3.utils.fromWei(rewardBusd, "Ether"))));
      setTotalEarnedBusd(numberWithCommas(Number(web3.utils.fromWei(shares.totalRealised, "Ether"))));
      setTokenBalance(numberWithCommas(Number(web3.utils.fromWei(balance, "Gwei"))));
    } catch (error) {
      console.log(`${error}`);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [state]);

  const handleClaimManually = async () => {
    if (pendingTx == true) {
      console.log("pending...");
      return;
    }
    console.log("handleClaimManually");
    setPendingTx(true);
    try {
      const tx = await DividendDistributorContract.methods.claimDividend().send({ from: account });
    } catch (error) {
      console.log("handleClaimManually error: ", error);
    }
    setPendingTx(false);
    init();
  }

  const fetchData = async (wallet) => {
    console.log(`fetchData`);
    try {
      const balance = await parcelforceContract.methods.balanceOf(wallet).call();
      const shares = await DividendDistributorContract.methods.shares(wallet).call();
      const rewardBusd = await DividendDistributorContract.methods.getUnpaidEarnings(wallet).call();
      setFetchRewardBusd(numberWithCommas(Number(web3.utils.fromWei(rewardBusd, "Ether"))));
      setFetchTotalEarnedBusd(numberWithCommas(Number(web3.utils.fromWei(shares.totalRealised, "Ether"))));
      setFetchTokenBalance(numberWithCommas(Number(web3.utils.fromWei(balance, "Gwei"))));
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return (
    <div className='d-flex flex-column justify-content-between'>
      <Header connect={connect} web3Provider={web3Provider} disconnect={disconnect} showAccountAddress={showAccountAddress} />
      <Sidebar />
      <Content
        web3={web3}
        web3Provider={web3Provider}
        handleClaimManually={handleClaimManually}
        tokenBalance={tokenBalance}
        tokenMarketCap={tokenMarketCap}
        totalEarnedBusd={totalEarnedBusd}
        rewardBusd={rewardBusd}
        fetchtokenBalance={fetchtokenBalance}
        fetchtokenMarketCap={fetchtokenMarketCap}
        fetchtotalEarnedBusd={fetchtotalEarnedBusd}
        fetchrewardBusd={fetchrewardBusd}
        fetchData={fetchData}
      />
      <Footer />
    </div>
  );
};

export default Dashboard;

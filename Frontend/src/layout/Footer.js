import React from "react";

const Footer = () => {
  return (
    <div
      className="m-4 text-center footer align-items-center d-flex"
      style={{ fontSize: "1rem", color: "white" }}
    >
      Rewards are automatically sent every 60minutes. It can, however, take
      longer depending on your holdings and trading volume. Rewards will be
      triggered once they are big enough to cover the gas fees. If you are a
      smaller holder it may take from a couple hours to a few days for rewards
      to appear in your wallet. You can also manually claim unclaimed rewards,
      but you will need to pay the gas fees.
    </div>
  );
};

export default Footer;

import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

import image1 from "../assets/img1.png";
import image2 from "../assets/img2.png";
import image3 from "../assets/img3.png";
import image4 from "../assets/img4.png";

const Sidebar = (props) => {
  const [show, setShow] = useState(false);
  return (
    <div className="position-absolute sidebar-top" style={{ top: "20%" }}>
      <div className="d-flex flex-column">
        <div className="image-padding p-3 border">
          <img src={image1} className="sidebar-image" width="50" alt="" />
        </div>
        <div className="image-padding p-3 border">
          <img src={image2} className="sidebar-image" width="50" alt="" />
        </div>
        <div className="image-padding p-3 border">
          <img src={image3} className="sidebar-image" width="50" alt="" />
        </div>
        <div
          className="image-padding p-3 border"
          onClick={() => setShow(!show)}
        >
          <img src={image4} className="sidebar-image" width="50" alt="" />
        </div>
        {show && (
          <>
            <div className="image-padding p-3 border">
              <FaTelegramPlane
                className="sidebar-image"
                size="50"
                color="#A656FF"
                alt=""
              />
            </div>
            <div className="image-padding p-3 border">
              <AiOutlineTwitter
                className="sidebar-image"
                size="50"
                color="#A656FF"
                alt=""
              />
            </div>
            <div className="image-padding p-3 border">
              <BsFacebook
                size="50"
                className="sidebar-image"
                color="#A656FF"
                alt=""
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

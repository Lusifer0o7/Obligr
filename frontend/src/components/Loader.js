import React from "react";
import "../assets/css/Loader.css";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

const Loader = () => {
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div style={{ height: "90%" }}>
          <div className="cube-loader">
            <div className="cube-top"></div>
            <div className="cube-wrapper">
              <span style={{ "--i": 0 }} className="cube-span"></span>
              <span style={{ "--i": 1 }} className="cube-span"></span>
              <span style={{ "--i": 2 }} className="cube-span"></span>
              <span style={{ "--i": 3 }} className="cube-span"></span>
            </div>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
};

export default Loader;

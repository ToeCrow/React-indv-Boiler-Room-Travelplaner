import React from "react";
import "./LoadingDots.css"; // CSS-fil för animationen

const LoadingDots = () => {
  return (
    <div className="loading-container">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

export default LoadingDots;

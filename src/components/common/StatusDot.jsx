import React from "react";

const StatusDot = ({ isOnline }) => {
  return (
    <span
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "10px",
        height: "10px",
        backgroundColor: isOnline ? "green" : "red",
        borderRadius: "50%",
        border: "2px solid white",
      }}
    ></span>
  );
};

export default StatusDot;

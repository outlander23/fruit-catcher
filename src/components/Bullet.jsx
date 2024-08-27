import React from "react";

const Bullet = ({ position }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "10px",
        height: "20px",
        backgroundColor: "red",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default Bullet;

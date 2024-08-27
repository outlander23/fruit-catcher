import React from "react";
import "../styles/animation.css";

function Plane({ position, isShooting }) {
  return (
    <div
      className={`absolute ${isShooting ? "plane-shoot" : "plane-fly"}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(0.3) `,
        width: "465px", // Adjust the size of the plane as needed
        height: "319px",
      }}
    />
  );
}

export default Plane;

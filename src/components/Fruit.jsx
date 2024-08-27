import React from "react";
import fruitImages from "../utils/fruits";

const Fruit = ({ position, type }) => {
  const currentFruitSrc = fruitImages[type];

  return (
    <img
      src={currentFruitSrc}
      alt="Fruit"
      style={{
        width: "110px",
        height: "115px",
        position: "absolute", // Ensure the fruit is positioned absolutely
        left: `${position.x}px`, // Apply the x-coordinate
        top: `${position.y}px`, // Apply the y-coordinate
      }}
    />
  );
};

export default Fruit;

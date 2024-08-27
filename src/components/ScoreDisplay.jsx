import React from "react";
import planeIcon from "../assets/plane/fly1.png"; // Path to your plane icon
import "../styles/scoreDisplay.css";

const ScoreDisplay = ({ score, numberOfLifeLeft }) => {
  return (
    <div className="score-display">
      <div className="score-info">
        <div className="score-info">
          <span className="score-label">Score:</span>
          <span className="score-value">{score}</span>
        </div>
        <div className="life-info">
          {Array.from({ length: numberOfLifeLeft }).map((_, index) => (
            <img
              key={index}
              src={planeIcon}
              alt="Plane life"
              className="plane-icon-life"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;

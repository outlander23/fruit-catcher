import React from "react";

const Navbar = ({ score }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Fruit Shooter Game</h1>
        <div className="navbar-score">
          <span className="score-label">Score:</span>
          <span className="score-value">{score}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import Plane from "./Plane";

function Game() {
  const [planePosition, setPlanePosition] = useState({
    x: window.innerWidth / 2 - 50, // Center horizontally
    y: window.innerHeight / 2 - 25, // Center vertically
  });
  const [isShooting, setIsShooting] = useState(false);

  useEffect(() => {
    const handleMovement = (e) => {
      setPlanePosition((prevPos) => {
        const moveAmount = 20;
        let newPos = { ...prevPos };

        if (e.key === "ArrowUp") {
          newPos.y = Math.max(prevPos.y - moveAmount, 0); // Move up
        } else if (e.key === "ArrowDown") {
          newPos.y = Math.min(prevPos.y + moveAmount, window.innerHeight - 50); // Move down
        } else if (e.key === "ArrowLeft") {
          newPos.x = Math.max(prevPos.x - moveAmount, 0); // Move left
        } else if (e.key === "ArrowRight") {
          newPos.x = Math.min(prevPos.x + moveAmount, window.innerWidth - 100); // Move right
        } else if (e.key === " ") {
          setIsShooting(true);
          setTimeout(() => setIsShooting(false), 500); // Shooting lasts 0.5 seconds
        }

        return newPos;
      });
    };

    window.addEventListener("keydown", handleMovement);

    return () => {
      window.removeEventListener("keydown", handleMovement);
    };
  }, []);

  // Generating and moving fruits (optional and commented out for now)

  return (
    <div className="relative w-full h-screen bg-blue-200 overflow-hidden moving-sky">
      <Plane position={planePosition} isShooting={isShooting} />
    </div>
  );
}

export default Game;

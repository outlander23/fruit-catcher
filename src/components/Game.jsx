import React, { useState, useEffect } from "react";
import Plane from "./Plane";
import Fruit from "./Fruit";
import Bullet from "./Bullet";
import ScoreDisplay from "./ScoreDisplay"; // Import the ScoreDisplay component
import fruitImages from "../utils/fruits";

function Game() {
  const [planePosition, setPlanePosition] = useState({
    x: window.innerWidth / 2 - 50,
    y: window.innerHeight / 2 - 25,
  });

  const [isShooting, setIsShooting] = useState(false);
  const [fruits, setFruits] = useState([]);
  const [bullets, setBullets] = useState([]);
  const [score, setScore] = useState(0);

  // Handle movement of the plane
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
          const newBullet = {
            id: Date.now(), // Unique ID for each bullet
            x: prevPos.x + 50, // Center of the plane
            y: prevPos.y,
          };
          setBullets((prevBullets) => [...prevBullets, newBullet]);
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

  // Generate fruits
  useEffect(() => {
    const generateFruit = () => {
      const fruitKeys = Object.keys(fruitImages);
      const fruitId = Math.random();
      const randomKey = fruitKeys[Math.floor(Math.random() * fruitKeys.length)];
      const newFruit = {
        id: fruitId,
        x: Math.random() * (window.innerWidth - 110),
        y: 0,
        type: randomKey, // Store fruit type
      };
      setFruits((prevFruits) => [...prevFruits, newFruit]);
    };

    const fruitInterval = setInterval(generateFruit, 1000);

    return () => clearInterval(fruitInterval);
  }, []);

  // Move fruits and bullets, and handle collisions
  useEffect(() => {
    const moveFruitsAndBullets = () => {
      setFruits(
        (prevFruits) =>
          prevFruits
            .map((fruit) => ({
              ...fruit,
              y: fruit.y + 5,
            }))
            .filter((fruit) => fruit.y <= window.innerHeight) // Keep fruits within the window
      );

      setBullets(
        (prevBullets) =>
          prevBullets
            .map((bullet) => ({
              ...bullet,
              y: bullet.y - 10, // Move bullets upwards
            }))
            .filter((bullet) => bullet.y >= 0) // Keep bullets within the window
      );

      // Check for collisions between bullets and fruits
      setFruits((prevFruits) =>
        prevFruits.filter((fruit) => {
          const isHit = bullets.some((bullet) => {
            const isColliding =
              bullet.x < fruit.x + 110 &&
              bullet.x + 10 > fruit.x &&
              bullet.y < fruit.y + 115 &&
              bullet.y + 20 > fruit.y;

            if (isColliding) {
              setScore((prevScore) => prevScore + 1);
              return false; // Remove the bullet on collision
            }
            return true;
          });
          return isHit; // Keep fruits that were not hit
        })
      );

      setBullets((prevBullets) =>
        prevBullets.filter((bullet) => {
          return !fruits.some((fruit) => {
            const isColliding =
              bullet.x < fruit.x + 110 &&
              bullet.x + 10 > fruit.x &&
              bullet.y < fruit.y + 115 &&
              bullet.y + 20 > fruit.y;

            if (isColliding) {
              return true; // Remove the bullet on collision
            }
            return false;
          });
        })
      );
    };

    const interval = setInterval(moveFruitsAndBullets, 100);

    return () => clearInterval(interval);
  }, [fruits, bullets, planePosition, isShooting]);

  return (
    <div className="relative w-full h-screen bg-blue-200 overflow-hidden moving-sky">
      <ScoreDisplay score={score} numberOfLifeLeft={3} />{" "}
      {/* Add the ScoreDisplay here */}
      <Plane position={planePosition} isShooting={isShooting} />
      {fruits.map((fruit) => (
        <Fruit
          key={fruit.id}
          position={{ x: fruit.x, y: fruit.y }}
          type={fruit.type}
        />
      ))}
      {bullets.map((bullet) => (
        <Bullet key={bullet.id} position={{ x: bullet.x, y: bullet.y }} />
      ))}
    </div>
  );
}

export default Game;

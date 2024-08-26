import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [basketPosition, setBasketPosition] = useState(50); // Basket in the middle
  const [fruits, setFruits] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleMovement = (e) => {
      if (e.key === 'ArrowLeft') {
        setBasketPosition((pos) => Math.max(pos - 10, 0));
      } else if (e.key === 'ArrowRight') {
        setBasketPosition((pos) => Math.min(pos + 10, 90));
      }
    };

    window.addEventListener('keydown', handleMovement);

    return () => {
      window.removeEventListener('keydown', handleMovement);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFruits((fruits) => [
        ...fruits,
        { id: Math.random(), left: Math.random() * 90, top: 0 },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFruits((fruits) =>
        fruits
          .map((fruit) => ({
            ...fruit,
            top: fruit.top + 5,
          }))
          .filter((fruit) => {
            if (
              fruit.top > 90 &&
              Math.abs(fruit.left - basketPosition) < 10
            ) {
              setScore(score + 1);
              return false;
            }
            return fruit.top < 100;
          })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [basketPosition, score]);

  return (
    <div className="relative w-full h-screen bg-blue-500 overflow-hidden">
      <div
        className="absolute bottom-4 w-12 h-8 bg-yellow-500 rounded-md"
        style={{ left: `${basketPosition}%` }}
      />
      {fruits.map((fruit) => (
        <div
          key={fruit.id}
          className="absolute w-8 h-8 bg-red-500 rounded-full"
          style={{ left: `${fruit.left}%`, top: `${fruit.top}%` }}
        />
      ))}
      <div className="absolute top-4 right-4 text-white text-2xl">
        Score: {score}
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import Game from "./components/Game";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return <div>{isLoading ? <LoadingScreen /> : <Game />}</div>;
}

export default App;

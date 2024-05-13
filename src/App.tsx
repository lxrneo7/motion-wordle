import React, { useState } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import "./App.css";
import useFetchRandomWord from "./hooks/useFetchRandomWord";

export default function App() {
  const [tiles, setTiles] = useState<string[]>(Array(30).fill(""));
  const randomWord = useFetchRandomWord();


  const handleTileChange = (index: number, value: string) => {
    const newTiles: string[] = [...tiles];
    newTiles[index] = value.toUpperCase(); 
    setTiles(newTiles);
  };

  React.useEffect(() => {
    if (randomWord) {
      setTiles([...randomWord.split(""), ...Array(30 - randomWord.length).fill("")]);
    }
  }, [randomWord]);

  return (
    <div className="App">
      <Header />
      <Board tiles={tiles} onTileChange={handleTileChange} />
    </div>
  );
}

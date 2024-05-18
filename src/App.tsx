import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import "./App.css";
import useFetchRandomWord from "./hooks/useFetchRandomWord";

const App: React.FC = () => {
  const [tiles, setTiles] = useState<string[]>(Array(30).fill(""));
  const [colors, setColors] = useState<string[]>(Array(30).fill("")); 
  const randomWord = useFetchRandomWord();

  const handleTileChange = (index: number, value: string) => {
    const newTiles = [...tiles];
    newTiles[index] = value.toUpperCase();
    setTiles(newTiles);

    if ((index + 1) % 5 === 0) {
      const start = index - 4;
      const end = index + 1;
      const word = newTiles.slice(start, end).join("");
      updateColors(word, start);
    }
  };

  const updateColors = (word: string, start: number) => {
    const newColors = [...colors];
    const wordArray = randomWord.split("");
    const guessedArray = word.split("");

    guessedArray.forEach((letter, i) => {
      if (letter === wordArray[i]) {
        newColors[start + i] = "green";
      } else if (wordArray.includes(letter)) {
        newColors[start + i] = "yellow";
      } else {
        newColors[start + i] = "grey";
      }
    });

    setColors(newColors);
  };

  useEffect(() => {
    if (randomWord) {
      setTiles([...Array(30).fill("")]);
      setColors([...Array(30).fill("")]);
    }
  }, [randomWord]);

  return (
    <div className="App">
      <Header />
      <Board tiles={tiles} colors={colors} onTileChange={handleTileChange} />
    </div>
  );
};

export default App;

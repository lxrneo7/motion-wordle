import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal"; 
import "./App.css";
import useFetchRandomWord from "./hooks/useFetchRandomWord";

const App: React.FC = () => {
  const [tiles, setTiles] = useState<string[]>(Array(30).fill(""));
  const [colors, setColors] = useState<string[]>(Array(30).fill(""));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [isLose, setIsLose] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
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
      setAttempts(attempts + 1);

      if (attempts + 1 >= 4 && !isWin) {
        setIsLose(true);
        setModalMessage(`Вы проиграли! Правильное слово: ${randomWord}`);
        setIsModalVisible(true);
      }
    }
  };
  //

  const updateColors = (word: string, start: number) => {
    const newColors = [...colors];
    const wordArray = randomWord.split("");
    const guessedArray = word.split("");

    let isCorrectWord = true;

    guessedArray.forEach((letter, i) => {
      if (letter === wordArray[i]) {
        newColors[start + i] = "green";
      } else if (wordArray.includes(letter)) {
        newColors[start + i] = "yellow";
        isCorrectWord = false;
      } else {
        newColors[start + i] = "grey";
        isCorrectWord = false;
      }
    });

    setColors(newColors);

    if (isCorrectWord) {
      setIsWin(true);
      setModalMessage("Вы выиграли!");
      setIsModalVisible(true);
    }
  };

  const handleKeyPress = (key: string) => {
    if (isWin || isLose) return;

    if (key === "BACKSPACE") {
      if (currentIndex > 0) {
        const newTiles = [...tiles];
        newTiles[currentIndex - 1] = "";
        setTiles(newTiles);
        setCurrentIndex(currentIndex - 1);
      }
    } else if (key === "ENTER") {
      const currentRow = Math.floor(currentIndex / 5);
      const nextRowIndex = (currentRow + 1) * 5;
      if (nextRowIndex < tiles.length) {
        setCurrentIndex(nextRowIndex);
      }
    } else if (/[A-Z]/.test(key) && currentIndex < tiles.length) {
      handleTileChange(currentIndex, key);
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (randomWord) {
      setTiles([...Array(30).fill("")]);
      setColors([...Array(30).fill("")]);
      setCurrentIndex(0);
      setIsWin(false);
      setIsLose(false);
      setAttempts(0);
    }
  }, [randomWord]);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="App">
      <Header />
      <Board tiles={tiles} colors={colors} onTileChange={handleTileChange} />
      <Keyboard onKeyPress={handleKeyPress} />
      <Modal
        message={modalMessage}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
    </div>
  );
};

export default App;

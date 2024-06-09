import { useEffect, useState } from "react";

const useFetchRandomWord = () => {
  const [randomWord, setRandomWord] = useState<string>("");

  useEffect(() => {
    const fetchRandomWord = async () => {
      try {
        const response = await fetch("https://piccolo-server.vercel.app/words");
        const data = await response.json();
        const words: string[] = data.data;
        const randomIndex: number = Math.floor(Math.random() * words.length);
        const randomWord: string = words[randomIndex];
        setRandomWord(randomWord.toUpperCase());
      } catch (error) {
        console.error("Error fetching random word:", error);
      }
    };

    fetchRandomWord();
  }, []); 

  return randomWord;
};

export default useFetchRandomWord;

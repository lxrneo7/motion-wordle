import React, { useRef } from "react";

interface BoardProps {
  tiles: string[];
  onTileChange: (index: number, value: string) => void;
}

const Board: React.FC<BoardProps> = ({ tiles, onTileChange }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleTileChange = (index: number, value: string) => {
    onTileChange(index, value);
    
    if (value.length > 0 && index < tiles.length - 1) {
      if (index % 5 !== 4) { 
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && tiles[index] === "" && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    } else if (event.key === "Enter") {
      if (index % 5 === 4 && tiles[index] !== "") { 
        const nextRowIndex = index + 1;
        if (nextRowIndex < tiles.length) {
          const nextInput = inputRefs.current[nextRowIndex];
          if (nextInput) {
            nextInput.focus();
          }
        }
      }
    }
  };

  return (
    <div className="board">
      {tiles.map((letter, index) => (
        <input
          ref={(el) => (inputRefs.current[index] = el)}
          key={index}
          className="tile"
          type="text"
          maxLength={1}
          value={letter}
          onChange={(e) => handleTileChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  );
};

export default Board;

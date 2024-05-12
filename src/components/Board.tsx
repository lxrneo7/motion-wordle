
import React from "react";

interface BoardProps {
  tiles: string[];
  onTileChange: (index: number, value: string) => void;
}

const Board: React.FC<BoardProps> = ({ tiles, onTileChange }) => {
  return (
    <div className="board">
      {tiles.map((letter, index) => (
        <input
          className="tile"
          key={index}
          type="text"
          maxLength={1}
          value={letter}
          onChange={(e) => onTileChange(index, e.target.value)}
        />
      ))}
    </div>
  );
};

export default Board;

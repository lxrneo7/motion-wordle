import React from "react";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
  const keys = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    ["ENTER", ..."ZXCVBNM".split(""), "BACKSPACE"]
  ];

  const handleKeyPress = (key: string) => {
    onKeyPress(key);
  };

  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={`key ${key.length > 1 ? "wide-key" : ""}`}
              onClick={() => handleKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;

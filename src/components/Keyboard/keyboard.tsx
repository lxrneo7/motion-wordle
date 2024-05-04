import React, { useCallback } from 'react';
import { getRandomWord } from '../../models/dictionary';
import { WordleAction, WordleActionType } from '../../models/reducer';
import './keyboard.css';

const keyboard = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export interface WordleKeyboardProps {
  word: string;
  gameOver: boolean;
  invalidLetters: Set<string>;
  dispatch: (action: WordleAction) => void;
}

export const WordleKeyboard = ({
  word,
  dispatch,
  gameOver,
  invalidLetters,
}: WordleKeyboardProps) => {
  const setSlotValue = useCallback(
    (letter: string) =>
      dispatch({
        type: WordleActionType.SetSlotValue,
        payload: { letter },
      }),
    [dispatch]
  );

  const rows = keyboard.map((row, rowIndex) => {
    const keys = row.map((key, keyIndex) => (
      <button
        key={keyIndex}
        disabled={invalidLetters.has(key)}
        className="wordle-keyboard__row__key"
        onClick={() => setSlotValue(key)}
      >
        {key}
      </button>
    ));

    if (rowIndex === keyboard.length - 1) {
      const backspace = (
        <button
          key="delete"
          className="wordle-keyboard__row__key--delete"
          onClick={() => setSlotValue('')}
        >
          Delete
        </button>
      );
      const enter = (
        <button
          key="enter"
          className="wordle-keyboard__row__key--enter"
          onClick={() =>
            dispatch({ type: WordleActionType.Validate, payload: {} })
          }
        >
          Enter
        </button>
      );
      keys.unshift(enter);
      keys.push(backspace);
    }

    return (
      <div key={rowIndex} className="wordle-keyboard__row">
        {keys}
      </div>
    );
  });

  return (
    <div className="wordle-keyboard">
      {!gameOver && rows}
      {gameOver && (
        <React.Fragment>
          <h3 className="wordle-keyboard__game-over">GAME OVER</h3>
          <div className="wordle-keyboard__word">[{word.toUpperCase()}]</div>
          <button
            className="wordle-keyboard__new-game"
            onClick={() =>
              dispatch({
                type: WordleActionType.Start,
                payload: { word: getRandomWord(), attempts: 6 },
              })
            }
          >
            New Game
          </button>
        </React.Fragment>
      )}
    </div>
  );
};

import React, { useMemo, useReducer } from 'react';
import { render } from 'react-dom';
import { WordleGrid } from './components/Grid/grid';
import { WordleKeyboard } from './components/Keyboard/keyboard';
import { WordleToolbar } from './components/Toolbar/toolbar';
import { getRandomWord } from './models/dictionary';
import { wordleStateReducer } from './models/reducer';
import { generateInitialState } from './models/state';
import './App.css';

const App = () => {
  const initialState = useMemo(
    () => generateInitialState(getRandomWord(), 6),
    []
  );
  const [{ word, values, gameOver, invalidLetters }, dispatch] = useReducer(
    wordleStateReducer,
    initialState
  );

  return (
    <div className="wordle-app">
      <WordleToolbar />
      <WordleGrid values={values} />
      <WordleKeyboard
        word={word}
        dispatch={dispatch}
        gameOver={gameOver}
        invalidLetters={invalidLetters}
      />
    </div>
  );
};

render(<App />, document.getElementById('root'));

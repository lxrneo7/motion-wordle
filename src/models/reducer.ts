import { generateInitialState, WordleSlotState, WordleState } from './state';

export enum WordleActionType {
  Start,
  Validate,
  SetSlotValue,
}

export interface WordleAction {
  type: WordleActionType;
  payload: unknown;
}

export const wordleStateReducer = (
  state: WordleState,
  action: WordleAction
) => {
  switch (action.type) {
    case WordleActionType.Validate:
      _validateAttempt(state);
      return {
        ...state,
      };
    case WordleActionType.SetSlotValue:
      const { letter } = action.payload as any;
      _setSlotValue(state, letter);
      return {
        ...state,
      };
    case WordleActionType.Start:
      const { word, attempts } = action.payload as any;
      return generateInitialState(word, attempts);
    default:
      return state;
  }
};


const _setSlotValue = (state: WordleState, letter: string) => {
  let currentSlotIndex = state.slot;
  const lastSlotIndex = state.values[state.attempt].length - 1;
  const isLastSlot = state.slot === lastSlotIndex;
  const currentSlot = state.values[state.attempt][currentSlotIndex];

  if (!!letter) {
    state.values[state.attempt][currentSlotIndex] = {
      ...currentSlot,
      value: letter,
    };
    state.slot = _clampIndex(state.slot + 1, 0, lastSlotIndex);
  } else {
    currentSlotIndex =
      isLastSlot && state.values[state.attempt][currentSlotIndex].value
        ? currentSlotIndex
        : currentSlotIndex - 1;
    state.values[state.attempt][currentSlotIndex] = {
      ...currentSlot,
      value: letter,
    };

    state.slot = _clampIndex(currentSlotIndex, 0, lastSlotIndex);
  }
};


const _validateAttempt = (state: WordleState) => {
  const attempts = state.values[state.attempt];
  let wonGame = true;
  let word = state.word;
  if (attempts.every((attempt) => !!attempt.value)) {
   
    const matchedIndexes = new Set<number>();

 
    state.values[state.attempt] = attempts.map((slot, slotIndex) => {
      const matchIndex = _findMatchIndex(
        word.toLowerCase(),
        slot.value.toLowerCase(),
        matchedIndexes
      );

      let slotState = WordleSlotState.Invalid;
      if (matchIndex !== -1) {
        slotState =
          matchIndex === slotIndex
            ? WordleSlotState.Valid
            : WordleSlotState.InvalidSlot;
        matchedIndexes.add(matchIndex);
      } else if (
        state.word.toLowerCase().indexOf(slot.value.toLowerCase()) === -1
      ) {
        state.invalidLetters.add(slot.value);
      }

      if (slotState !== WordleSlotState.Valid) {
        wonGame = false;
      }

      return {
        ...slot,
        state: slotState,
      };
    });

    state.attempt = state.attempt + 1;

    state.slot = 0;

    state.gameOver = wonGame || state.attempt === state.values.length;
  }
};

const _findMatchIndex = (
  word: string,
  value: string,
  matchedIndexes: Set<number>
) => {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === value && !matchedIndexes.has(i)) {
      return i;
    }
  }
  return -1;
};

const _clampIndex = (index: number, min: number, max: number) => {
  return Math.min(Math.max(min, index), max);
};

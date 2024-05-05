export enum WordleSlotState {
    Empty = 'empty',
    Valid = 'valid',
    Invalid = 'invalid',
    InvalidSlot = 'invalid-slot',
  }
  
  export interface WordleSlot {
    value: string;
    state: WordleSlotState;
  }
  
  export interface WordleState {
    values: Array<WordleSlot[]>;
    attempt: number;
    slot: number;
    word: string;
    gameOver: boolean;
    invalidLetters: Set<string>;
  }
  
  export const generateInitialState = (
    word: string,
    attempts: number
  ): WordleState => {
    const values = Array(attempts)
      .fill([])
      .map(() => [
        ...Array(word.length)
          .fill({})
          .map(() => ({
            value: '',
            state: WordleSlotState.Empty,
          })),
      ]);
  
    return {
      word,
      values,
      slot: 0,
      attempt: 0,
      gameOver: false,
      invalidLetters: new Set<string>(),
    };
  };
  
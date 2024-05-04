import React from 'react';
import { WordleState } from '../../models/state';
import './grid.css';

export interface WordleGridProps extends Pick<WordleState, 'values'> {}

export const WordleGrid = ({ values }: WordleGridProps) => {
  const rows = values.map((rowColumns, rowIndex) => {
    const columns = rowColumns.map((slot, columnIndex) => {
      const slotClassName = `wordle-grid__slot wordle-grid__slot--${slot.state}`;
      return (
        <div key={columnIndex} className={slotClassName}>
          {slot.value}
        </div>
      );
    });
    return (
      <div key={rowIndex} className="wordle-grid__row">
        {columns}
      </div>
    );
  });

  return <div className="wordle-grid">{rows}</div>;
};

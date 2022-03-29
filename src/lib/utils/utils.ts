import type { CellState } from "./../../store/slices/gridSlice";
import { Difficulty } from "./../enums/difficulties";

export interface CellIndexes {
  row: number;
  col: number;
}

const arrayShuffle = (array: number[]) => {
  const cloned = [...array];

  for (let index = cloned.length - 1; index > 0; index--) {
    const newIndex = Math.floor(Math.random() * (index + 1));
    [cloned[index], cloned[newIndex]] = [cloned[newIndex], cloned[index]];
  }
  return cloned;
};

/**
 * returns the initial index (of a row or column) inside a 3x3 square of a 9x9 grid
 * @param currentIndex the target row or col index
 */
export const getInitialSquareIndex = (currentIndex: number): number => {
  if (currentIndex < 0 || currentIndex > 8) {
    throw new Error("invalid currentIndex, must be between 0 and 8");
  }
  if (currentIndex >= 0 && currentIndex <= 2) return 0;
  else if (currentIndex >= 3 && currentIndex <= 5) return 3;
  else if (currentIndex >= 6 && currentIndex <= 8) return 6;
  else return 0;
};

/**
 * returns the last index (of a row or column) of a 3x3 square in a 9x9 grid
 * @param currentIndex the target row or col index
 */
export const getLastSquareIndex = (currentIndex: number): number => {
  if (currentIndex < 0 || currentIndex > 8) {
    throw new Error("invalid currentIndex, must be between 0 and 8");
  }
  if (currentIndex >= 0 && currentIndex <= 2) return 2;
  else if (currentIndex >= 3 && currentIndex <= 5) return 5;
  else if (currentIndex >= 6 && currentIndex <= 8) return 8;
  else return 2;
};

/**
 * Returns the square number the cell belongs to
 * @param cellCoordinates the row and column index of the cell
 */
export const getSquareNumber = ({
  row,
  col,
}: {
  row: number;
  col: number;
}): number => {
  // first 3 rows
  if (row >= 0 && row <= 2) {
    if (col >= 0 && col <= 2) {
      return 1;
    } else if (col >= 3 && col <= 5) {
      return 2;
    } else {
      return 3;
    }
  }
  // second 3 rows
  else if (row >= 3 && row <= 5) {
    if (col >= 0 && col <= 2) {
      return 4;
    } else if (col >= 3 && col <= 5) {
      return 5;
    } else {
      return 6;
    }
  }
  // last 3 rows
  else {
    if (col >= 0 && col <= 2) {
      return 7;
    } else if (col >= 3 && col <= 5) {
      return 8;
    } else {
      return 9;
    }
  }
};

/**
 * Clones a 2d array
 * @param array the array to clone
 * @returns a new copy of the provided 2d array
 */
const cloneArray = (array: number[][]): number[][] => {
  return array.map((a) => a.slice());
};

/**
 * Randomly generates the position (indexes) where hints should be present in the sudoku grid
 * @param difficulty difficulty level which will affect the number of hints
 * @returns
 */
const generateHintsPositions = (difficulty: Difficulty) => {
  const array: number[] = [];
  let numberOfHints: number;

  switch (difficulty) {
    case Difficulty.Easy: // 36 - 46
      numberOfHints = 36;
      break;
    case Difficulty.Medium: // 32 - 35
      numberOfHints = 32;
      break;
    case Difficulty.Hard: // 28 - 31
      numberOfHints = 28;
      break;
    case Difficulty.Insane: // 17 - 27
      numberOfHints = 17;
      break;
  }

  for (let i = 0; i < 81; i++) {
    array[i] = i;
  }

  const shuffled = arrayShuffle(array)
    .slice(0, numberOfHints)
    .sort((a, b) => a - b);
  return shuffled;
};

export const pruneSudokuGrid = (
  grid: number[][],
  difficulty: Difficulty
): (number | null)[][] => {
  const clonedGrid: (number | null)[][] = cloneArray(grid);
  const allowedHints = generateHintsPositions(difficulty);
  let loopIteration = 0;

  for (let rowIndex = 0; rowIndex < clonedGrid.length; rowIndex++) {
    const row = clonedGrid[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      if (allowedHints.indexOf(loopIteration) === -1) {
        clonedGrid[rowIndex][colIndex] = null;
      }

      loopIteration++;
    }
  }

  return clonedGrid;
};

/**
 * Remove numbers  from a filled sudoku grid
 * @param grid a 2d array containing the grid numbers
 * @param difficulty the difficulty level. The higher it is the less hints are left in the grid
 */
export const pruneSudokuGridCells = (
  grid: number[][],
  difficulty: Difficulty
): CellState[][] => {
  const allowedHints = generateHintsPositions(difficulty);
  let loopIteration = 0;

  const clonedGrid: CellState[][] = grid.map((row) =>
    row.map((number) => {
      const cell: CellState = {
        number,
        immutableNumber: number,
        isProtected: true,
      };
      // hide hints that are not in the hints array
      if (allowedHints.indexOf(loopIteration) === -1) {
        // hints that are not shown should be guessed by the user
        // their number is not set and are free to modify
        cell.number = null;
        cell.isProtected = false;
      }

      loopIteration++;

      return cell;
    })
  );

  return clonedGrid;
};

/**
 * Calculates the possibilites that can go in the target cell based on the already filled numbers in the grid
 * @param grid the sudoku grid
 * @param cellCoordinates the row and col indicies of the cell to compute its possiblites
 * @returns an array of numbers that can go in the target cell
 */
export const getCellPossibilities = (
  grid: CellState[][],
  cellCoordinates: CellIndexes
): number[] => {
  const { row, col } = cellCoordinates;
  const forbidden = new Set<number>();

  // looping through row
  for (let cellIndex = 0; cellIndex < grid[row].length; cellIndex++) {
    const cell = grid[row][cellIndex];
    if (cell.number !== null) forbidden.add(cell.number);
  }
  // looping through col
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const cell = grid[rowIndex][col];
    if (cell.number !== null) forbidden.add(cell.number);
  }
  // looping through the cell square
  const squareYStart = getInitialSquareIndex(row);
  const squareYEnd = getLastSquareIndex(row);
  const squareXStart = getInitialSquareIndex(col);
  const squareXEnd = getLastSquareIndex(col);

  for (let rowIndex = squareYStart; rowIndex <= squareYEnd; rowIndex++) {
    const row = grid[rowIndex];
    for (let colIndex = squareXStart; colIndex <= squareXEnd; colIndex++) {
      const cell = row[colIndex];
      if (cell.number !== null) forbidden.add(cell.number);
    }
  }

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const fobiddenArray = Array.from(forbidden);
  // return only the numbers not present in the forbidden array
  return numbers.filter((n) => fobiddenArray.indexOf(n) === -1);
};

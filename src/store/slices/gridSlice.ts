import {
  pruneSudokuGridCells,
  getSquareNumber,
  createNotesArray,
} from "./../../lib/utils/utils";
import { HorizontalDirections } from "./../../lib/enums/directions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VerticalDirections } from "../../lib/enums/directions";
import { Difficulty } from "../../lib/enums/difficulties";

export interface CellCoordinates {
  row: number;
  col: number;
  square: number;
}
export interface NullableCellCoordinates {
  row: number | null;
  col: number | null;
  square: number | null;
}

type Notes = { [noteNumber: string]: boolean };

export interface CellState {
  number: number | null;
  immutableNumber: number;
  isProtected: boolean;
}
interface GridState {
  grid: CellState[][];
  selectedCell: NullableCellCoordinates;
  autoNotes: boolean;
  noteMode: boolean;
  notes: number[][][];
  errorDetector: boolean;
  disableUnusable: boolean;
}

const grid: number[][] = [
  [5, 9, 8, 6, 2, 3, 1, 4, 7],
  [7, 4, 3, 1, 5, 8, 2, 9, 6],
  [2, 6, 1, 4, 7, 9, 3, 5, 8],
  [8, 1, 7, 5, 4, 2, 9, 6, 3],
  [9, 3, 4, 8, 6, 7, 5, 1, 2],
  [6, 2, 5, 3, 9, 1, 7, 8, 4],
  [1, 8, 9, 7, 3, 4, 6, 2, 5],
  [3, 5, 2, 9, 8, 6, 4, 7, 1],
  [4, 7, 6, 2, 1, 5, 8, 3, 9],
];

const prunedGrid = pruneSudokuGridCells(grid, Difficulty.Easy);

const initialState: GridState = {
  grid: prunedGrid,
  selectedCell: {
    row: null,
    col: null,
    square: null,
  },
  autoNotes: false,
  noteMode: false,
  notes: createNotesArray(),
  errorDetector: true,
  disableUnusable: false,
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setCellNumber(state, action: PayloadAction<number>) {
      const { row, col } = state.selectedCell;

      if (row === null || col === null) return;

      const cell = state.grid[row][col];

      const number = action.payload;
      if (number < 1 || number > 9) return;
      if (!cell.isProtected) {
        if (!state.noteMode) {
          // if note mode is not active, set the cell number instead of the notes
          if (cell.number !== number) {
            state.grid[row][col].number = number;
            // check if the number needs to be removed from the notes related to the target cell
            if (!state.autoNotes) {
            }
          }
        } else {
          const noteIndex = number - 1;
          // set notes otherwise
          const noteNumber = state.notes[row][col][noteIndex];
          // if the number number is 0 (i.e. not set) set it to the requested number, otherwise, set it back to 0
          state.notes[row][col][noteIndex] = noteNumber === 0 ? number : 0;
        }
      }
    },
    resetCellNumber(state) {
      const { row, col } = state.selectedCell;

      if (row === null || col === null) return;
      const cell = state.grid[row][col];
      console.log("restting");
      // reset the cell notes as well
      state.notes[row][col] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

      if (cell.number !== null && !cell.isProtected) {
        state.grid[row][col].number = null;
      }
    },
    resetCellNotes(state) {
      const { row, col } = state.selectedCell;
      if (row === null || col === null) return;

      state.notes[row][col] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    },
    removeCellNoteNumber(
      state,
      action: PayloadAction<{ number: number; row: number; col: number }>
    ) {
      const { number, row, col } = action.payload;

      state.notes[row][col][number - 1] = 0;
    },

    setSelectedCell(state, action: PayloadAction<CellCoordinates>) {
      const { row, col, square } = action.payload;
      state.selectedCell.row = row;
      state.selectedCell.col = col;
      state.selectedCell.square = square;
    },
    resetSelectedCell(state) {
      state.selectedCell.col =
        state.selectedCell.row =
        state.selectedCell.square =
          null;
    },
    moveSelectedRow(state, action: PayloadAction<VerticalDirections>) {
      const verticalDirection = action.payload;
      if (state.selectedCell.row === null || state.selectedCell.col === null) {
        state.selectedCell.row = state.selectedCell.col = 0;
        state.selectedCell.square = 1;
      } else {
        const currentSelectedRow = state.selectedCell.row;
        if (verticalDirection === VerticalDirections.Down) {
          if (currentSelectedRow + 1 > 8) return;
          state.selectedCell.row++;
        } else {
          if (currentSelectedRow - 1 < 0) return;
          state.selectedCell.row--;
        }
        // moving the square as well
        const square = getSquareNumber({
          row: state.selectedCell.row,
          col: state.selectedCell.col,
        });

        if (state.selectedCell.square !== square) {
          state.selectedCell.square = square;
        }
      }
    },
    moveSelectedCol(state, action: PayloadAction<HorizontalDirections>) {
      const horizontalDirection = action.payload;
      if (state.selectedCell.col === null || state.selectedCell.row === null) {
        state.selectedCell.col = state.selectedCell.row = 0;
        state.selectedCell.square = 1;
      } else {
        const currentSelectedCol = state.selectedCell.col;
        if (horizontalDirection === HorizontalDirections.Right) {
          if (currentSelectedCol + 1 > 8) return;
          state.selectedCell.col++;
        } else {
          if (currentSelectedCol - 1 < 0) return;
          state.selectedCell.col--;
        }

        // moving the square as well

        const square = getSquareNumber({
          row: state.selectedCell.row,
          col: state.selectedCell.col,
        });

        if (state.selectedCell.square !== square) {
          state.selectedCell.square = square;
        }
      }
    },
    toggleAutoNotes(state) {
      state.autoNotes = !state.autoNotes;
    },
    setAutoNotes(state, action: PayloadAction<boolean>) {
      if (state.autoNotes !== action.payload) state.autoNotes = action.payload;
    },
    toggleNoteMode(state) {
      state.noteMode = !state.noteMode;
    },
    setNoteMode(state, action: PayloadAction<boolean>) {
      if (state.noteMode !== action.payload) state.noteMode = action.payload;
    },
    toggleErrorDetector(state) {
      state.errorDetector = !state.errorDetector;
    },
    toggleDisableUnusable(state) {
      state.disableUnusable = !state.disableUnusable;
    },
    revealHint(state) {
      // reveals a hint at the target cell
      const { row, col } = state.selectedCell;
      if (row === null || col === null) return;

      const cellData = state.grid[row][col];
      state.grid[row][col].number = cellData.immutableNumber;
      state.grid[row][col].isProtected = true;
    },
  },
});

export const {
  setSelectedCell,
  resetSelectedCell,
  moveSelectedRow,
  moveSelectedCol,
  setCellNumber,
  resetCellNumber,
  resetCellNotes,
  removeCellNoteNumber,
  toggleAutoNotes,
  setAutoNotes,
  toggleNoteMode,
  setNoteMode,
  toggleErrorDetector,
  toggleDisableUnusable,
  revealHint,
} = gridSlice.actions;
export default gridSlice.reducer;

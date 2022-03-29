import { pruneSudokuGridCells } from "./../../lib/utils/utils";
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

export interface CellState {
  number: number | null;
  immutableNumber: number;
  isProtected: boolean;
}
interface GridState {
  grid: CellState[][];
  selectedCell: NullableCellCoordinates;
  autoNotes: boolean;
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

const prunedGrid = pruneSudokuGridCells(grid, Difficulty.Insane);

const initialState: GridState = {
  grid: prunedGrid,
  selectedCell: {
    row: null,
    col: null,
    square: null,
  },
  autoNotes: false,
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setCellNumber(state, action: PayloadAction<number>) {
      const row = state.selectedCell.row;
      const col = state.selectedCell.col;
      if (row === null || col === null) return;

      const number = action.payload;
      if (number < 1 || number > 9) return;
      const cell = state.grid[row][col];
      if (cell.number !== number && !cell.isProtected) {
        state.grid[row][col].number = number;
      }
    },
    resetCellNumber(state) {
      const row = state.selectedCell.row;
      const col = state.selectedCell.col;
      if (row === null || col === null) return;

      if (!state.grid[row][col].isProtected) {
        state.grid[row][col].number = null;
      }
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
      if (state.selectedCell.row === null) {
        state.selectedCell.row = state.selectedCell.col = 0;
      } else {
        const currentSelectedRow = state.selectedCell.row;
        if (verticalDirection === VerticalDirections.Down) {
          if (currentSelectedRow + 1 > 8) return;
          state.selectedCell.row++;
        } else {
          if (currentSelectedRow - 1 < 0) return;
          state.selectedCell.row--;
        }
      }
    },
    moveSelectedCol(state, action: PayloadAction<HorizontalDirections>) {
      const horizontalDirection = action.payload;
      if (state.selectedCell.col === null) {
        state.selectedCell.col = state.selectedCell.row = 0;
      } else {
        const currentSelectedCol = state.selectedCell.col;
        if (horizontalDirection === HorizontalDirections.Right) {
          if (currentSelectedCol + 1 > 8) return;
          state.selectedCell.col++;
        } else {
          if (currentSelectedCol - 1 < 0) return;
          state.selectedCell.col--;
        }
      }
    },
    toggleAutoNotes(state) {
      state.autoNotes = !state.autoNotes;
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
  toggleAutoNotes,
} = gridSlice.actions;
export default gridSlice.reducer;

import {
  getSquareNumber,
  createNotesArray,
  generateGrid,
  getHintCount,
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

export interface CellState {
  number: number | null;
  readonly immutableNumber: number;
  isProtected: boolean;
}
interface GridHistory {
  cell: CellCoordinates;
  number?: number | null;
  notes?: number[];
}

interface GridState {
  grid: CellState[][];
  selectedCell: NullableCellCoordinates;
  autoNotes: boolean;
  noteMode: boolean;
  notes: number[][][];
  errorDetector: boolean;
  disableUnusable: boolean;
  difficulty: Difficulty | null;
  history: GridHistory[];
  filledCells: number;
  isGameWon: boolean;
  usedHelpers: {
    hints: number;
    autoNotes: boolean;
    errorsDetector: boolean;
    disabledUnusable: boolean;
  };
}

// const grid: number[][] = [
//   [5, 9, 8, 6, 2, 3, 1, 4, 7],
//   [7, 4, 3, 1, 5, 8, 2, 9, 6],
//   [2, 6, 1, 4, 7, 9, 3, 5, 8],
//   [8, 1, 7, 5, 4, 2, 9, 6, 3],
//   [9, 3, 4, 8, 6, 7, 5, 1, 2],
//   [6, 2, 5, 3, 9, 1, 7, 8, 4],
//   [1, 8, 9, 7, 3, 4, 6, 2, 5],
//   [3, 5, 2, 9, 8, 6, 4, 7, 1],
//   [4, 7, 6, 2, 1, 5, 8, 3, 9],
// ];

const initialState: GridState = {
  grid: [],
  selectedCell: {
    row: null,
    col: null,
    square: null,
  },
  autoNotes: false,
  noteMode: false,
  notes: createNotesArray(),
  errorDetector: false,
  disableUnusable: false,
  difficulty: null,
  history: [],
  filledCells: 0, // number of cells have been filled, required to check when the grid should be checked for validity
  // game completion state
  isGameWon: false,
  usedHelpers: {
    hints: 0,
    autoNotes: false,
    errorsDetector: false,
    disabledUnusable: false,
  },
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setCellNumber(
      state,
      action: PayloadAction<{ number: number; isShift?: boolean }>
    ) {
      const { row, col, square } = state.selectedCell;

      if (row === null || col === null || square === null) return;

      const cell = state.grid[row][col];

      const { number, isShift } = action.payload;

      if (number < 1 || number > 9) return;
      if (!cell.isProtected) {
        if (!state.noteMode && !isShift) {
          // if note mode is not active, set the cell number instead of the notes
          // if (cell.number !== number) {
          // ** register previous number history before updating the number
          gridSlice.caseReducers.queueHistory(state, {
            payload: {
              cell: { row, col, square },
              number: cell.number,
            },
            type: gridSlice.actions.queueHistory.type,
          });

          // Only increment the filled cells state if the cell number is not set yet
          if (cell.number === null) {
            state.filledCells++;
          }
          // and only decrement the filled cells state if the requested number is equal the the current one
          // i.e. is meant to be toggled off
          if (cell.number === number) {
            state.filledCells =
              state.filledCells - 1 < 0 ? 0 : state.filledCells - 1;
          }

          // state update (toggle number)
          state.grid[row][col].number = cell.number === number ? null : number;

          if (state.filledCells === 81) {
            // verify game
            gridSlice.caseReducers.verifyGame(state);
          }
        } else {
          // * NOTE INSERTION HANDLING

          // only run this if the cell number is null
          if (cell.number !== null) return;
          const noteIndex = number - 1;
          // set notes otherwise
          const noteNumber = state.notes[row][col][noteIndex];
          // ** register previous notes history before updating the notes
          gridSlice.caseReducers.queueHistory(state, {
            payload: {
              cell: { row, col, square },
              notes: [...state.notes[row][col]],
            },
            type: gridSlice.actions.queueHistory.type,
          });
          // if the number number is 0 (i.e. not set) set it to the requested number, otherwise, set it back to 0
          state.notes[row][col][noteIndex] = noteNumber === 0 ? number : 0;
        }
      }
    },
    resetCellNumber(state) {
      const { row, col, square } = state.selectedCell;

      if (row === null || col === null || square === null) return;
      const cell = state.grid[row][col];
      if (cell.isProtected) return;

      const isEmptyCellNotes = state.notes[row][col].every((n) => n === 0);
      // if there is nothing to reset, return;
      if (cell.number === null && isEmptyCellNotes) return;
      // handle history before updating any state

      // registering previous notes before deletion
      gridSlice.caseReducers.queueHistory(state, {
        payload: {
          cell: { row, col, square },
          notes: [...state.notes[row][col]],
          number: cell.number,
        },
        type: gridSlice.actions.queueHistory.type,
      });

      // reset the cell notes as well
      if (!isEmptyCellNotes) {
        state.notes[row][col] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      }

      if (cell.number !== null) {
        state.grid[row][col].number = null;
        // * Decrement the number of cells that have been filled since the cell is being reset
        state.filledCells =
          state.filledCells - 1 < 0 ? 0 : state.filledCells - 1;
      }
    },
    resetCellNotes(state) {
      const { row, col, square } = state.selectedCell;
      if (row === null || col === null || square === null) return;

      // register history before restting
      gridSlice.caseReducers.queueHistory(state, {
        payload: {
          cell: { row, col, square },
          notes: [...state.notes[row][col]],
        },
        type: gridSlice.actions.queueHistory.type,
      });
      state.notes[row][col] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    },

    removeCellNoteNumber(
      state,
      action: PayloadAction<{
        number: number;
        row: number;
        col: number;
        square: number;
      }>
    ) {
      const { number, row, col, square } = action.payload;
      // register history before resetting. Only register if requested from a cell that matches the selectedCell state
      if (row === state.selectedCell.row && col === state.selectedCell.col) {
        state.history.push({
          cell: { row, col, square },
          notes: [...state.notes[row][col]],
        });
      }
      // reset the target cell note regardless
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
      // mark this helper as used
      if (!state.usedHelpers.autoNotes) {
        state.usedHelpers.autoNotes = true;
      }
      state.autoNotes = !state.autoNotes;
    },
    setAutoNotes(state, action: PayloadAction<boolean>) {
      // mark this helper as used
      if (action.payload === true && !state.usedHelpers.autoNotes) {
        state.usedHelpers.autoNotes = true;
      }
      if (state.autoNotes !== action.payload) state.autoNotes = action.payload;
    },
    toggleNoteMode(state) {
      state.noteMode = !state.noteMode;
    },
    setNoteMode(state, action: PayloadAction<boolean>) {
      if (state.noteMode !== action.payload) state.noteMode = action.payload;
    },
    toggleErrorDetector(state) {
      // mark this helper as used
      if (!state.usedHelpers.errorsDetector) {
        state.usedHelpers.errorsDetector = true;
      }

      state.errorDetector = !state.errorDetector;
    },
    toggleDisableUnusable(state) {
      // mark this helper as used
      if (!state.usedHelpers.disabledUnusable) {
        state.usedHelpers.disabledUnusable = true;
      }
      state.disableUnusable = !state.disableUnusable;
    },
    revealHint(state) {
      // reveals a hint at the target cell
      const { row, col, square } = state.selectedCell;
      if (row === null || col === null) return;

      const cellData = state.grid[row][col];
      if (cellData.isProtected) return;

      state.grid[row][col].number = cellData.immutableNumber;
      state.grid[row][col].isProtected = true;
      // increment the number of used hints
      state.usedHelpers.hints++;

      // increment filled cells count
      state.filledCells++;

      // * Additionally, remove any previous history that belongs to the revealed cell
      state.history = state.history.filter(
        (history) =>
          history.cell.col !== col ||
          history.cell.row !== row ||
          history.cell.square !== square
      );

      if (state.filledCells === 81) {
        // verify game
        gridSlice.caseReducers.verifyGame(state);
      }
    },
    resetGridState(state) {
      // reset the game won state
      state.isGameWon =
        state.usedHelpers.autoNotes =
        state.usedHelpers.errorsDetector =
        state.usedHelpers.disabledUnusable =
          false;
      state.usedHelpers.hints = 0;
      // reset history
      state.history = [];
      // reset helpers
      state.autoNotes = state.errorDetector = state.disableUnusable = false;
      // reset the the number of filled cells
      state.filledCells = 0;
      // reset the selected cell
      state.selectedCell.row =
        state.selectedCell.col =
        state.selectedCell.square =
          null;
      // reset the notes & notes array
      state.noteMode = false;
      state.notes = [];
      // reset the difficulty
      state.difficulty = null;
      state.grid = [];

      // GENERATORS
    },
    startNewGame(state, action: PayloadAction<Difficulty>) {
      const difficulty = action.payload;

      gridSlice.caseReducers.resetGridState(state);
      // GENERATORS
      state.difficulty = difficulty;
      // generate a new grid
      state.grid = generateGrid(difficulty);
      // reset the notes array
      state.notes = createNotesArray();
      // set the number of already filled celled (hints) based on the difficulty
      state.filledCells = getHintCount(difficulty);
    },
    queueHistory(state, action: PayloadAction<GridHistory>) {
      const { cell, notes, number } = action.payload;
      const { row, col } = cell;
      // remove first history item before adding a new one if the history exceeds 100 in length
      // this will allow only a maximum of 100 undos
      if (state.history.length === 100) state.history.shift();
      // add to the history queue
      state.history.push({
        cell,
        // only spread notes if notes are defined
        ...(notes !== undefined && { notes: [...state.notes[row][col]] }),
        // only spread number if number is defined
        ...(number !== undefined && { number }),
      });
    },

    undo(state) {
      const history = state.history;
      if (history.length === 0) return;
      const lastOperation = history[history.length - 1];
      const {
        cell: { row, col },
      } = lastOperation;

      // move the selected cell to history  cell coordinates
      state.selectedCell = lastOperation.cell;

      // if the last operation was related to cell number (either adding or removing)
      if (lastOperation.number !== undefined) {
        // * FILLEDCOUNT HISTORY HANDLING
        // handle the filledCell count when traversing history
        if (lastOperation.number !== null) {
          // only increment back if current cell number is null
          if (state.grid[row][col].number === null) {
            state.filledCells++;
          }
        } else {
          // if previous number was null, decrement filledCount
          state.filledCells--;
        }
        // * END FILLEDCOUNT HANDLING
        state.grid[row][col].number = lastOperation.number;
      }

      // if the last operation was related to cell notes (either adding or removing)
      if (lastOperation.notes !== undefined) {
        state.notes[row][col] = lastOperation.notes;
      }
      // remove the last history after being done with it
      history.pop();
      // console.log(JSON.parse(JSON.stringify(lastOperation)));
    },

    verifyGame(state) {
      if (state.filledCells !== 81) return;
      for (let rowIndex = 0; rowIndex < state.grid.length; rowIndex++) {
        const row = state.grid[rowIndex];

        for (let colIndex = 0; colIndex < row.length; colIndex++) {
          const cell = row[colIndex];
          if (cell.number !== cell.immutableNumber) return;
        }
      }
      state.isGameWon = true;
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
  startNewGame,
  resetGridState,
  undo,
} = gridSlice.actions;
export default gridSlice.reducer;

import { CellState } from "../../store/slices/gridSlice";
import { CellIndexes, getCellPossibilities, getSquareNumber } from "./utils";
test("getSquareNumber should return the appropriate square number based on the row & col indices", () => {
  const result = getSquareNumber({
    row: 5,
    col: 8,
  });
  expect(result).toBe(6);
});

test("getCellPossibilities should return the possibilites of the target cell", () => {
  // todo
  const grid: (number | null)[][] = [
    [5, null, 8, null, 2, null, 1, 4, null],
    [7, null, null, 1, null, 8, null, 9, 6],
    [2, null, null, 4, null, null, 3, null, 8],
    [null, 1, 7, 5, null, null, null, 6, 3],
    [null, 3, null, null, 6, 7, 5, 1, 2],
    [null, 2, 5, 3, null, null, 7, null, 4],
    [null, 8, null, null, null, 4, 6, 2, 5],
    [null, 5, 2, 9, 8, null, 4, 7, null],
    [null, null, 6, null, 1, 5, 8, null, 9],
  ];

  const mockedStoreGrid: CellState[][] = grid.map((row) => {
    return row.map((cellNumber) => {
      const cellState: CellState = {
        number: cellNumber,
        immutableNumber: 0, // irrelevant for this test
        isProtected: false, // irrelevant for this test
      };

      return cellState;
    });
  });
  const targetCell: CellIndexes = {
    row: 0,
    col: 0,
  };

  // the first cell of the grid (row index 0 and col index 0) has:
  // the numbers 5,8,2,1,4 in its row
  // the numbers 5, 7, 2 in its column
  // and the numbers 5, 7, 2, 8 in its square
  // meaning that the numbers already present are 1,2,4,5,7,8
  // which should leave with the numbers 3, 6, and 9 as possiblites
  // therefore the output should be an array equaling [3,6,9]
  const result = getCellPossibilities(mockedStoreGrid, targetCell);

  expect(result).toEqual([3, 6, 9]);
});

export {};

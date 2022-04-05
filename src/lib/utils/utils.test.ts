import { CellState } from "../../store/slices/gridSlice";
import {
  CellIndexes,
  doesCellHaveDuplicates,
  getCellPossibilities,
  getSquareNumber,
} from "./utils";

// representation of testGrid
// r = row - c = column
// ------------------------------------------------------------------------
// *    c:0      c:1     c:2    c:3     c:4     c:5     c:6     c:7     c:8
// r:0  [5,      null,   8,     null,   2,      null,   1,      4,      null],
// r:1  [7,      null,   null,  1,      null,   8,      null,   9,      6],
// r:2  [2,      null,   null,  4,      null,   null,   3,      null,   8],
// r:3  [null,   1,      7,     5,      null,   null,   null,   6,      3],
// r:4  [null,   3,      null,  null,   6,      7,      5,      1,      2],
// r:5  [null,   2,      5,     3,      null,   null,   7,      null,   4],
// r:6  [null,   8,      null,  null,   null,   4,      6,      2,      5],
// r:7  [null,   5,      2,     9,      8,      null,   4,      7,      null],
// r:8  [null,   null,   6,     null,   1,      5,      8,      null,   9],

// a mocked grid
const testGrid: (number | null)[][] = [
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

const mockStoreGrid = (grid: (number | null)[][]): CellState[][] => {
  return grid.map((row) => {
    return row.map((cellNumber) => {
      const cellState: CellState = {
        number: cellNumber,
        immutableNumber: 0, // irrelevant for this test
        isProtected: false, // irrelevant for this test
      };
      return cellState;
    });
  });
};

test("getSquareNumber should return the appropriate square number based on the row & col indices", () => {
  const result = getSquareNumber({
    row: 5,
    col: 8,
  });
  expect(result).toBe(6);
});

test("getCellPossibilities should return the possibilites of the target cell", () => {
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
  const result = getCellPossibilities(mockStoreGrid(testGrid), targetCell);

  expect(result).toEqual([3, 6, 9]);
});

describe("checkIfNumberAlreadyExists()", () => {
  it("should return false when the number at the target cell is not repeated in the related row/col/square", () => {
    // number that will be checked is in grid[7][6] = 4
    const result = doesCellHaveDuplicates({
      grid: mockStoreGrid(testGrid),
      row: 7,
      col: 6,
    });

    expect(result).toBe(false);
  });
  it("should return true when the number at the target cell is repeated in any of the related row/col/square", () => {
    // the number 2 is repeated in the first column of the 3rd and 4th rows
    const testGridWithDuplicates: (number | null)[][] = [
      [5, null, 8, null, 2, null, 1, 4, null],
      [7, null, null, 1, null, 8, null, 9, 6],
      [2, null, null, 4, null, null, 3, null, 8],
      [2, 1, 7, 5, null, null, null, 6, 3],
      [null, 3, null, null, 6, 7, 5, 1, 2],
      [null, 2, 5, 3, null, null, 7, null, 4],
      [null, 8, null, null, null, 4, 6, 2, 5],
      [null, 5, 2, 9, 8, null, 4, 7, null],
      [null, null, 6, null, 1, 5, 8, null, 9],
    ];
    // number that will be checked is in grid[7][6] = 4
    const result = doesCellHaveDuplicates({
      grid: mockStoreGrid(testGridWithDuplicates),
      row: 3,
      col: 0,
    });

    expect(result).toBe(true);
  });
});

export {};

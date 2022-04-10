import {
  getInitialSquareIndex,
  getMissingNumbers,
  removeArrayDuplicates,
  getArrayMinNumberIndex,
  removeNumberOccurrence,
  convertObjectKeysToNumbers,
  getLeastOccurredNumberCount,
  pickFromNumber,
  randomNumber,
  cloneArray,
} from "./utils/sudoku-utils";

interface CellCoordinates {
  row: number;
  col: number;
}

export class Sudoku {
  private _grid: number[][] = [];

  public get grid() {
    return this._grid;
  }

  /**
   * Helper Method to shuffle an array
   */
  private _shuffleArray(originalArray: number[]): number[] {
    const array = [...originalArray];

    for (let i = 0; i < array.length; i++) {
      const newIndex = randomNumber(0, array.length - 1);
      const tempTargetVal = array[newIndex];
      array[newIndex] = array[i];
      array[i] = tempTargetVal;
    }
    return array;
  }

  private _resetGrid() {
    this._grid = [];
  }
  /**
   * Helper method to generate a randomly sorted array containing numbers from 1 to 9
   */
  private _generateRandomRow() {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return this._shuffleArray(array);
  }

  /**
   * Retrieves a row from the grid
   */
  private _getRow(rowIndex: number) {
    return this._grid[rowIndex];
  }

  /**
   * Retrieves a column from the grid
   */
  private _getCol({ row: rowIndex, col: colIndex }: CellCoordinates): number[] {
    const cols: number[] = [];
    for (let row = rowIndex; row >= 0; row--) {
      const colValue = this._grid[row][colIndex];
      if (colValue) {
        cols.push(colValue);
      }
    }
    return cols;
  }

  /**
   * Retrieves all the values in the target square
   */
  private _getSquare({ col, row }: CellCoordinates): number[] {
    const initRowIndex = getInitialSquareIndex(row);
    const initColIndex = getInitialSquareIndex(col);
    const square: number[] = [];
    for (let row = initRowIndex; row <= initRowIndex + 2; row++) {
      // if current row is undefined, exist the loop;
      if (!this._grid[row]) break;

      for (let col = initColIndex; col <= initColIndex + 2; col++) {
        if (!this._grid[row][col]) break;
        const cellValue = this._grid[row][col];
        // if (cellValue !== 0) {
        square.push(cellValue);
        // }
      }
    }
    return square;
  }

  /**
   * Retrieves all the values that are present/forbidden in the target cell
   */
  private _getCell({ row, col }: CellCoordinates): number[] {
    const column = this._getCol({ row, col });
    const rowValues = this._getRow(row);
    const square = this._getSquare({ row, col });

    const combined = [...column, ...rowValues, ...square];

    return removeArrayDuplicates(combined, true);
  }

  private _getAllowedInCell({ row, col }: CellCoordinates): number[] {
    return getMissingNumbers(this._getCell({ row, col }));
  }
  /**
   * Get the possibilites in each cell of the target row
   * @param row the row index
   * @returns
   */
  private _getRowPossibilitiesInEachCell(row: number): number[][] {
    // first row is randomly generated, no need to computed its cell possible solutions
    if (row === 0) throw new Error("Row cannot be 0");
    const rowCellsSolution: number[][] = [];
    for (let col = 0; col < 9; col++) {
      const cellPossibleSolution = this._getAllowedInCell({ row, col });
      rowCellsSolution.push(cellPossibleSolution.sort((a, b) => a - b));
    }
    // each number represent the possible numbers that can go in that cell
    return rowCellsSolution;
  }

  /**
   * Geneartes a row of number according the rules taking into account the possiblities that go in each cell of the row.
   *
   * If the method reaches an impass i.e. When it cannot generate unique numbers anymore, it returns -1 rather than an array of numbers.
   * @param rowCellsPossibleSolutions a 2d array containing all the possiblities in each cell
   * @returns an array of number or -1 in case of an inability to generate a valid row
   */
  private _generateValidRow(
    rowCellsPossibleSolutions: number[][]
  ): number[] | number {
    const immutablePossibilities = cloneArray(rowCellsPossibleSolutions);
    let possibilities: number[][] = cloneArray(rowCellsPossibleSolutions);
    const generatedValidRow: { [cachedIndex: string]: number } = {};

    for (let i = 0; i < immutablePossibilities.length; i++) {
      const ignoreIndexList = convertObjectKeysToNumbers(
        Object.keys(generatedValidRow)
      );
      /** this will be the index of the target cell for which a valid number is to be generated */
      const minNumberIndex = getArrayMinNumberIndex(
        possibilities,
        ignoreIndexList
      );
      // if an impass is reached, exit the function and let the loop rollback
      if (minNumberIndex === -1) return -1;

      const minNumber = possibilities[minNumberIndex];
      // const minNumberStr = minNumber.toString();

      let validCellNumber: number;
      // first three cells are chosen randomly
      // this gives the function the ability to alter the generated numbers in case of a rollback
      if (i <= 2) {
        validCellNumber = pickFromNumber(minNumber);
      } else {
        validCellNumber = getLeastOccurredNumberCount(
          minNumber,
          possibilities,
          ignoreIndexList
        );
      }
      generatedValidRow[minNumberIndex] = validCellNumber;
      // before removing the number from the possibilities
      // add the successfully generated number index to the ignore list index so that
      // it gets ignored by the removeNumberOccurrence function
      ignoreIndexList.push(minNumberIndex);

      // remove the generated number from all the cells, to prevent it from getting picked up again

      possibilities = removeNumberOccurrence(
        possibilities,
        validCellNumber,
        ignoreIndexList
      );
    }

    return Object.values(generatedValidRow);
  }

  /**
   * Generates a valid sudoku grid
   */
  public generate(): number[][] {
    this._resetGrid();

    for (let row = 0; row < 9; row++) {
      if (row === 0) {
        // create the first row which is a randomly shuffled array of number
        // this will serve as the base for the next generation process
        const randomlyGeneratedRow = this._generateRandomRow();
        this._grid[row] = randomlyGeneratedRow;
      } else {
        this._grid[row] = [];

        const rowPossibleInEachCell = this._getRowPossibilitiesInEachCell(row);
        // const rowPossibilitiesContainNan = hasEmptyArray(rowPossibleInEachCell);
        const generatedRow = this._generateValidRow(rowPossibleInEachCell);

        // when the _generateValidRow method cannot generate a valid number for a cell
        // it exits the with a number (-1) rather than an array of number when it complete successfully,

        // therefore we need to rollback to the previous row and regenerate a new one when the methods return a number
        if (typeof generatedRow === "number") {
          // Reset the previous row

          // remove both the current empty and the previously generated row (so that it gets regenerated again)
          // before rolling back
          this._grid.splice(row - 1, 2);
          // rollback 2 rows back so that when the continue statement runs, the previous row will be regenerated
          row -= 2;
          // once we rollback, reiterate
          continue;
        }

        this._grid[row] = generatedRow;
      }
    }
    return this._grid;
  }
}

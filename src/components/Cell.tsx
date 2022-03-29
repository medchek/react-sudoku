import React from "react";
import { getCellPossibilities, getSquareNumber } from "../lib/utils/utils";
import { CellState, setSelectedCell } from "../store/slices/gridSlice";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";

interface Props {
  cell: CellState;
  row: number;
  col: number;
}

const Cell = ({ cell, col, row }: Props) => {
  // the selected cell coordinates in the store
  const selectedCell = useAppSelector(
    (state: RootState) => state.grid.selectedCell
  );
  const isAutoNotes = useAppSelector(
    (state: RootState) => state.grid.autoNotes
  );
  // the grid array in the store
  const grid = useAppSelector((state: RootState) => state.grid.grid);

  const dispatch = useAppDispatch();

  /** The square number  of the local cell (i.e. this instance the the component)*/
  const currentCellSquareNumber = getSquareNumber({ row, col });

  /**
   *  the square which the currently selected cell (in the store) belongs to
   */
  const selectedCellSquareNumber = (): number | null => {
    if (selectedCell.row === null || selectedCell.col === null) return null;
    return getSquareNumber({
      row: selectedCell.row,
      col: selectedCell.col,
    });
  };

  const isHighlightedInSquare =
    currentCellSquareNumber === selectedCellSquareNumber();

  // whether this cell instance row & col indices equal the selectedCell row/col values in the store
  const isCurrentlySelected: boolean =
    selectedCell.col === col &&
    selectedCell.row === row &&
    selectedCell.square === currentCellSquareNumber;

  /**
   * Returns The number value of the selected cell in the store
   * @returns the number of the selected cell, or null if no cell is selected
   */
  const storeSelectedCellNumber = () => {
    const row = selectedCell.row;
    const col = selectedCell.col;
    if (row === null || col === null) return null;
    return grid[row][col].number;
  };

  /**
   * Returns whether the number of this cell instance is already present in the col/row/square
   */
  const isCellNumberForbidden = (): boolean => {
    const storeSelectedNumber = storeSelectedCellNumber();

    if (storeSelectedNumber !== null) {
      // only process the cells that belong to the same col, row, sqr

      if (
        row === selectedCell.row ||
        col === selectedCell.col ||
        currentCellSquareNumber === selectedCell.square
      ) {
        // if they have the same number in col or row or square, return true
        if (cell.number === storeSelectedNumber) return true;
      }
    }

    return false;
  };

  /**
   * Whether the Number value of this cell instance is the same as the one selected in the store
   */
  const isCurrentCellNumberSameAsSelected =
    cell.number === null
      ? false
      : storeSelectedCellNumber() === cell.number
      ? true
      : false;

  /**
   * If the current cell instance belongs to the row/col/square of the selected cell of the store
   */
  const isHighlighted: boolean =
    (selectedCell.col === col ||
      selectedCell.row === row ||
      isHighlightedInSquare) &&
    !isCurrentlySelected;

  /**
   * Sets the selected cell coordinates in the store
   */
  const handleOnClick = () => {
    dispatch(
      setSelectedCell({
        row,
        col,
        square: currentCellSquareNumber,
      })
    );
  };

  // he possibilites that can go in the target cell
  const cellPossibilities = getCellPossibilities(grid, { row, col });

  const isNumberForbidden = () => {
    if (cell.number !== null) {
      return cellPossibilities.indexOf(cell.number) !== -1;
    }
    return false;
  };

  const displayPossibilites = (): JSX.Element[] => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return numbers.map((n) => {
      const show = cellPossibilities.indexOf(n) !== -1;
      return (
        <span key={n} className={show ? "visible" : "invisible"}>
          {n}
        </span>
      );
    });
  };

  return (
    <div
      className={[
        // "flex items-center justify-center w-[84px] h-[84px] ",
        "relative flex items-center justify-center w-[70px] h-[70px] text-[1.7rem] font-medium hover:shadow-inner outline-none cursor-pointer select-none transition-all",
        row === 0 ? "border-t-4 border-primaryLight" : "",
        row === 8 || row === 2 || row === 5
          ? "border-b-4 border-primaryLight"
          : "",
        row === 0 ||
        row === 1 ||
        row === 3 ||
        row === 4 ||
        row === 6 ||
        row === 7
          ? "border-b-2 border-b-lightGrey"
          : "",
        col === 0 ? "border-l-4 border-primaryLight" : "",
        col === 0 ||
        col === 1 ||
        col === 3 ||
        col === 4 ||
        col === 6 ||
        col === 7
          ? "border-r-2 border-r-lightGrey"
          : "",
        col === 8 || col === 2 || col === 5
          ? "border-r-4 border-primaryLight"
          : "",
        // `cell-row-${row} cell-col-${col} cell-sqr-${currentCellSquareNumber}`,

        // whether the current cell is the one selected
        isNumberForbidden()
          ? "bg-red-50 text-red-500"
          : // if the current cell instance the one selected
          isCurrentlySelected
          ? "bg-primaryLight"
          : // if the current cell NUMBER value matches the one selectedCell points to in the grid
          isCurrentCellNumberSameAsSelected // will basically highlight the same number in all the other cells
          ? "bg-primaryLight/50"
          : // whether the cell should be highlighted as part of row/col/sqr
          isHighlighted
          ? "bg-slate-100/80"
          : "",
        cell.isProtected ? "text-darkGrey/90" : "text-primary",
      ]
        .join(" ")
        .trim()}
      onClick={handleOnClick}
      // onBlur={handleOnBlur}
    >
      <span>{cell.number}</span>

      {isAutoNotes && cell.number === null && (
        <div className="possibilites grid grid-cols-3 grid-rows-3 justify-items-center items-center w-full h-full bg-transparent absolute left-0 top-0 right-0 bottom-0 text-darkGrey/70 text-sm font-thin">
          {displayPossibilites()}
        </div>
      )}
    </div>
  );
};

export default Cell;

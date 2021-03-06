import React, { useMemo, useEffect } from "react";
import {
  doesCellHaveDuplicates,
  getCellPossibilities,
  getSquareNumber,
} from "../../lib/utils/utils";
import {
  CellState,
  removeCellNoteNumber,
  resetCellNumber,
  setSelectedCell,
} from "../../store/slices/gridSlice";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";

interface Props {
  cell: CellState;
  row: number;
  col: number;
}

const Cell = ({ cell, col, row }: Props) => {
  // console.log("cell");

  // the grid array in the store
  const grid = useAppSelector((state: RootState) => state.grid.grid);
  const userCellNotes = useAppSelector(
    (state: RootState) => state.grid.notes[row][col]
  );
  // the selected cell coordinates in the store
  const selectedCell = useAppSelector(
    (state: RootState) => state.grid.selectedCell
  );
  const isAutoNotes = useAppSelector(
    (state: RootState) => state.grid.autoNotes
  );
  // const isNoteMode = useAppSelector((state: RootState) => state.grid.noteMode);

  const isErrorDetectorActive = useAppSelector(
    (state: RootState) => state.grid.errorDetector
  );

  const isCellNumberWrong: boolean = useMemo(() => {
    if (
      isErrorDetectorActive &&
      cell.number !== null &&
      cell.number !== cell.immutableNumber
    ) {
      return true;
    }
    return false;
  }, [cell.number, isErrorDetectorActive, cell.immutableNumber]);

  const isGamePause = useAppSelector(
    (state: RootState) => state.timer.isPaused
  );
  const dispatch = useAppDispatch();
  /** The square number  of the local cell (i.e. this instance the the component)*/
  const currentCellSquareNumber = getSquareNumber({ row, col });
  /**
   * Returns The number value of the selected cell in the store
   * @returns the number of the selected cell, or null if no cell is selected
   */
  const storeSelectedCellNumber = useMemo(() => {
    const row = selectedCell.row;
    const col = selectedCell.col;
    if (row === null || col === null) return null;
    return grid[row][col].number;
  }, [grid, selectedCell]);

  // track row/col/squares duplicates in the current cell
  const cellHasDuplicates = useMemo(() => {
    // if (cell.number !== storeSelectedCellNumber) return false;
    // only update if the grid changes are related to this cell
    // i.e. if the target cell that changed is part of this cell's row, col, or square
    return doesCellHaveDuplicates({ grid, col, row });
  }, [row, col, grid /* storeSelectedCellNumber,  cell.number */]);

  const isHighlightedInSquare = currentCellSquareNumber === selectedCell.square;

  // whether this cell instance row & col indices equal the selectedCell row/col values in the store
  const isCurrentlySelected: boolean =
    selectedCell.col === col && selectedCell.row === row;

  /**
   * Whether the Number value of this cell instance is the same as the one selected in the store
   */
  const isCurrentCellNumberSameAsSelected =
    cell.number === null
      ? false
      : storeSelectedCellNumber === cell.number
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

  // the possibilites that can go in the target cell
  const cellPossibilities = useMemo(() => {
    if (cell.number === null) {
      if (isAutoNotes) {
        // TODO : ACCESS REDUX FROM OUTSIDE THE COMPONENT TO MINIMIZE MEMO DEPENDENCIES, ESPECIALLY THE GRID ONE
        return getCellPossibilities(grid, { row, col });
        // return possiblities
      } else {
        const notes: number[] = userCellNotes.filter((n) => n > 0);

        return notes.length > 0 ? notes : null;
      }
    }
    return null;
  }, [cell.number, grid, isAutoNotes, row, col, userCellNotes]);

  /**
   * Displays the cell notes, either automatically if the autoNotes is active
   */
  const cellNotes = useMemo(() => {
    const possibilites = cellPossibilities;
    if (possibilites && possibilites.length > 0) {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      return numbers.map((n) => {
        const show = possibilites.indexOf(n) !== -1;
        return (
          <span key={n} className={show ? "visible" : "invisible"}>
            {n}
          </span>
        );
      });
    } else {
      return null;
    }
  }, [cellPossibilities]);

  // handles user note number removal when a number is added to related col/row/square
  useEffect(() => {
    if (storeSelectedCellNumber === null) return;
    // if the cell is highlighted (i.e. all the related cells to the current one) and the grid was changed
    if (isHighlighted && !isCurrentlySelected) {
      // the number to remove is the one added to the currently selected cell

      dispatch(
        removeCellNoteNumber({
          number: storeSelectedCellNumber,
          row,
          col,
          square: currentCellSquareNumber,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);

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
  /**
   * Resets the selected cell coordinates in the store
   */
  const handleOnMiddleMouseClick = () => {
    if (cell.number !== null || !userCellNotes.every((n) => n === 0)) {
      dispatch(
        setSelectedCell({
          row,
          col,
          square: currentCellSquareNumber,
        })
      );
      dispatch(resetCellNumber());
    }
  };

  return (
    <div
      className={[
        "relative flex items-center justify-center xl:w-[70px] xl:h-[70px] text-xl sm:text-2xl lg:text-[1.7rem] font-medium hover:shadow-inner outline-none cursor-pointer select-none basis-0 grow ",
        row === 0
          ? "border-t-[3px] md:border-t-4 border-primaryLight dark:border-darkCellGreen"
          : "",
        row === 8 || row === 2 || row === 5
          ? "border-b-[3px] md:border-b-4 border-primaryLight dark:border-darkCellGreen"
          : "",
        row === 0 ||
        row === 1 ||
        row === 3 ||
        row === 4 ||
        row === 6 ||
        row === 7
          ? "border-b-2 border-b-lightGrey dark:border-b-darkCellGrey"
          : "",
        col === 0
          ? "border-l-[3px] md:border-l-4 border-primaryLight dark:border-darkCellGreen"
          : "",
        col === 0 ||
        col === 1 ||
        col === 3 ||
        col === 4 ||
        col === 6 ||
        col === 7
          ? "border-r-2 border-r-lightGrey dark:border-r-darkCellGrey"
          : "",
        col === 8 || col === 2 || col === 5
          ? "border-r-[3px] md:border-r-4 border-primaryLight dark:border-darkCellGreen"
          : "",
        // `cell-row-${row} cell-col-${col} cell-sqr-${currentCellSquareNumber}`,

        // BACK GROUND COLOR

        // whether the current cell is the one selected
        // cell.isError
        cellHasDuplicates
          ? `bg-red-100 dark:bg-red-500/30 ${
              !cell.isProtected ? "!text-red-500" : ""
            }`
          : // if the current cell instance the one selected
          isCurrentlySelected
          ? "is-selected bg-primaryLight dark:bg-[#35715b8e]"
          : // if the current cell NUMBER value matches the one selectedCell points to in the grid
          isCurrentCellNumberSameAsSelected // will basically highlight the same number in all the other cells
          ? "bg-primaryLight/40  dark:bg-zinc-700"
          : // whether the cell should be highlighted as part of row/col/sqr
          isHighlighted
          ? "bg-slate-100/80 dark:bg-black"
          : "",
        cell.isProtected
          ? "text-darkGrey/90 dark:text-zinc-50"
          : isCellNumberWrong
          ? "!text-red-500"
          : "text-primary",
      ]
        .join(" ")
        .trim()}
      onClick={handleOnClick}
      onAuxClick={handleOnMiddleMouseClick}
      tabIndex={0}
    >
      <span>
        {/* if the cell number is null, insert invisible content to prevent cell squashing when an entier row is empty */}
        {!isGamePause && (cell.number ?? <span className="invisible">0</span>)}
      </span>

      {cellNotes && cell.number === null && (
        <div className="possibilites grid grid-cols-3 grid-rows-3 justify-items-center items-center w-full h-full bg-transparent absolute left-0 top-0 right-0 bottom-0 text-darkGrey/70 dark:text-neutral-400 text-[0.7rem] sm:text-xs md:text-sm sm:font-thin">
          {cellNotes}
        </div>
      )}
    </div>
  );
};
// only rerender when selected cell matches the component row / col indexes
export default Cell;

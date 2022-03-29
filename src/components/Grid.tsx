import React, { useEffect } from "react";
import {
  HorizontalDirections,
  VerticalDirections,
} from "../lib/enums/directions";
import {
  moveSelectedCol,
  moveSelectedRow,
  resetCellNumber,
  setCellNumber,
} from "../store/slices/gridSlice";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";
import Row from "./Row";

const Grid = () => {
  const sudokuGrid = useAppSelector((state: RootState) => state.grid.grid);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // console.log(`handling keydown ${e.key} - ${e.code}`);
      const key = e.code;
      switch (key) {
        case "ArrowUp":
          dispatch(moveSelectedRow(VerticalDirections.Up));
          break;
        case "ArrowRight":
          dispatch(moveSelectedCol(HorizontalDirections.Right));
          break;
        case "ArrowDown":
          dispatch(moveSelectedRow(VerticalDirections.Down));
          break;
        case "ArrowLeft":
          dispatch(moveSelectedCol(HorizontalDirections.Left));
          break;
        // numbers handling
        case "Numpad1":
        case "Digit1":
          dispatch(setCellNumber(1));
          break;
        case "Numpad2":
        case "Digit2":
          dispatch(setCellNumber(2));
          break;
        case "Numpad3":
        case "Digit3":
          dispatch(setCellNumber(3));
          break;
        case "Numpad4":
        case "Digit4":
          dispatch(setCellNumber(4));
          break;
        case "Numpad5":
        case "Digit5":
          dispatch(setCellNumber(5));
          break;
        case "Numpad6":
        case "Digit6":
          dispatch(setCellNumber(6));
          break;
        case "Numpad7":
        case "Digit7":
          dispatch(setCellNumber(7));
          break;
        case "Numpad8":
        case "Digit8":
          dispatch(setCellNumber(8));
          break;
        case "Numpad9":
        case "Digit9":
          dispatch(setCellNumber(9));
          break;
        case "Delete":
        case "Numpad0":
        case "Backspace":
        case "Digit0":
          dispatch(resetCellNumber());
          break;

        default:
          return;
      }
    };

    document.body.addEventListener("keydown", handleKeydown, { capture: true });

    return () => {
      document.body.removeEventListener("keydown", handleKeydown, {
        capture: true,
      });
    };
  }, []);

  console.log("rending grid");

  const displayGrid = sudokuGrid.map((row, rowIndex) => {
    return <Row row={row} rowIndex={rowIndex} key={`row-${rowIndex}`} />;
  });

  return (
    <div
      id="grid"
      tabIndex={-1}
      className="flex flex-col items-center justify-center outline-none"
    >
      {displayGrid}
    </div>
  );
};

export default Grid;

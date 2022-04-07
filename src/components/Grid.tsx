import React, { useEffect, useMemo, lazy, Suspense } from "react";
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

const Paused = lazy(() => import("./Paused"));

const Grid = () => {
  const isPaused = useAppSelector((state: RootState) => state.timer.isPaused);
  const isNoteMode = useAppSelector((state: RootState) => state.grid.noteMode);

  const sudokuStoreGrid = useAppSelector((state: RootState) => state.grid.grid);
  const dispatch = useAppDispatch();

  const sudokuGrid = useMemo(() => sudokuStoreGrid, [sudokuStoreGrid]);

  useEffect(() => {
    if (isPaused) return;
    const handleKeydown = (e: KeyboardEvent) => {
      // console.log(`handling keydown ${e.key} - ${e.code}`);

      // console.log("modifier?", e.getModifierState("Shift"));

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
  }, [dispatch, isPaused]);

  const displayGrid = useMemo(() => {
    return sudokuGrid.map((row, rowIndex) => {
      return <Row row={row} rowIndex={rowIndex} key={`row-${rowIndex}`} />;
    });
  }, [sudokuGrid]);

  return (
    <div
      id="grid"
      tabIndex={-1}
      className="absolute flex flex-col items-center justify-center outline-none w-[630px] h-[630px]"
    >
      {displayGrid}
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center absolute top-0 w-full h-full bg-white">
            Loading...
          </div>
        }
      >
        {isPaused && <Paused />}
      </Suspense>
    </div>
  );
};

export default Grid;

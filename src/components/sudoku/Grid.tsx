import React, { useEffect, useMemo, lazy, Suspense } from "react";
import {
  HorizontalDirections,
  VerticalDirections,
} from "../../lib/enums/directions";
import {
  moveSelectedCol,
  moveSelectedRow,
  resetCellNumber,
  revealHint,
  setCellNumber,
  toggleAutoNotes,
  toggleNoteMode,
  undo,
} from "../../store/slices/gridSlice";
import { togglePauseTimer } from "../../store/slices/timerSlice";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import GridHeader from "./GridHeader";
import Row from "./Row";

const Paused = lazy(() => import("./Paused"));

const Grid = () => {
  const isPaused = useAppSelector((state: RootState) => state.timer.isPaused);

  const sudokuStoreGrid = useAppSelector((state: RootState) => state.grid.grid);
  const dispatch = useAppDispatch();

  const sudokuGrid = useMemo(() => sudokuStoreGrid, [sudokuStoreGrid]);

  useEffect(() => {
    if (isPaused) return;
    const handleKeydown = (e: KeyboardEvent) => {
      // console.log(`handling keydown ${e.key} - ${e.code}`);

      // console.log("modifier?", e.getModifierState("Shift"));

      const isShift = e.getModifierState("Shift");
      const isCtrl = e.getModifierState("Control");
      const isAlt = e.getModifierState("Alt");
      const key = e.code;

      if (isCtrl) {
        if (key === "KeyW" || key === "KeyZ") {
          dispatch(undo());
        }
      } else if (isAlt) {
        if (key === "Backspace") {
          dispatch(undo());
        }
      } else {
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
            dispatch(setCellNumber({ number: 1, isShift }));
            break;
          case "Numpad2":
          case "Digit2":
            dispatch(setCellNumber({ number: 2, isShift }));
            break;
          case "Numpad3":
          case "Digit3":
            dispatch(setCellNumber({ number: 3, isShift }));
            break;
          case "Numpad4":
          case "Digit4":
            dispatch(setCellNumber({ number: 4, isShift }));
            break;
          case "Numpad5":
          case "Digit5":
            dispatch(setCellNumber({ number: 5, isShift }));
            break;
          case "Numpad6":
          case "Digit6":
            dispatch(setCellNumber({ number: 6, isShift }));
            break;
          case "Numpad7":
          case "Digit7":
            dispatch(setCellNumber({ number: 7, isShift }));
            break;
          case "Numpad8":
          case "Digit8":
            dispatch(setCellNumber({ number: 8, isShift }));
            break;
          case "Numpad9":
          case "Digit9":
            dispatch(setCellNumber({ number: 9, isShift }));
            break;
          case "Delete":
          case "Numpad0":
          case "Backspace":
          case "Digit0":
            dispatch(resetCellNumber());
            break;
          case "KeyP":
            dispatch(togglePauseTimer());
            break;
          case "KeyN":
            dispatch(toggleNoteMode());
            break;
          case "KeyH":
            dispatch(revealHint());
            break;
          case "KeyA":
          case "KeyQ":
            dispatch(toggleAutoNotes());
            break;

          default:
            return;
        }
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
    if (sudokuGrid.length === 0) return null;
    return sudokuGrid.map((row, rowIndex) => {
      return <Row row={row} rowIndex={rowIndex} key={`row-${rowIndex}`} />;
    });
  }, [sudokuGrid]);

  return (
    <div
      id="grid"
      tabIndex={-1}
      className="relative flex flex-col items-center justify-center outline-none w-screen sm:w-[550px] lg:w-[600px] xl:w-[630px] h-full px-4 grow"
    >
      <GridHeader />
      <div className="relative flex flex-col items-center justify-center w-full h-[100vw] sm:h-[550px] lg:h-[600px] xl:h-[630px]  sm:px-0 bg-white dark:bg-darkGreyBg">
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
    </div>
  );
};

export default Grid;

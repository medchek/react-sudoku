import React, { Fragment, useMemo } from "react";
import { getCellForbidden } from "../../lib/utils/utils";
import { setCellNumber } from "../../store/slices/gridSlice";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import SetNumberButton from "../buttons/SetNumberButton";

const PadNumbers = () => {
  const dispatch = useAppDispatch();

  const isPaused = useAppSelector((state: RootState) => state.timer.isPaused);
  const isDisableUnusable = useAppSelector(
    (state: RootState) => state.grid.disableUnusable
  );
  const selectedCell = useAppSelector(
    (state: RootState) => state.grid.selectedCell
  );
  const grid = useAppSelector((state: RootState) => state.grid.grid);
  // const isDisableUnusable = useAppSelector(
  //   (state: RootState) => state.grid.disableUnusable
  // );
  const unusableNumbers: number[] | null = useMemo(() => {
    const { row, col } = selectedCell;

    if (!isDisableUnusable || row === null || col === null) {
      return null;
    } else {
      return getCellForbidden(grid, { row, col });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell, isDisableUnusable]);

  const handleOnClick = (n: number) => {
    if (isPaused) return;
    dispatch(setCellNumber({ number: n }));
  };

  const disabledNumbers: boolean[] = useMemo(() => {
    if (unusableNumbers === null) {
      return new Array(9).fill(false);
    } else {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
        return unusableNumbers.indexOf(n) !== -1 ? true : false;
      });
    }
  }, [unusableNumbers]);

  return (
    <Fragment>
      {disabledNumbers.map((isUnusableNumber, i) => (
        <SetNumberButton
          key={i}
          onClick={() => handleOnClick(i + 1)}
          disabled={isPaused || isUnusableNumber}
        >
          {i + 1}
        </SetNumberButton>
      ))}
    </Fragment>
  );
};

export default PadNumbers;

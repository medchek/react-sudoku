import React from "react";
import { unpauseTimer } from "../../store/slices/timerSlice";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";

const Paused = () => {
  const difficulty = useAppSelector(
    (state: RootState) => state.grid.difficulty
  );
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    if (difficulty === null) return;
    dispatch(unpauseTimer());
  };

  return (
    <div
      id="pause-screen"
      className={`${
        difficulty === null ? "invisible" : ""
      } flex flex-col items-center justify-center absolute top-0 left-0 right-0 bottom-0 z-100 bg-white dark:bg-darkBg space-y-2 border-4 border-primaryLight dark:border-darkCellGreen`}
    >
      <p className="font-medium text-xl md:text-2xl text-darkGrey dark:text-zinc-300 w-4/6 md:w-1/2 text-center">
        The game is currenty{" "}
        <span className="font-bold dark:text-white">Paused</span>
      </p>
      <button
        disabled={difficulty === null}
        type="button"
        onClick={handleOnClick}
        className="bg-slate-50 px-2 py-1 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-200/70 hover:text-slate-700 active:text-primary transition-colors disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default Paused;

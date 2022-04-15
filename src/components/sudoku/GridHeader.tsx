import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import { Difficulty } from "../../lib/enums/difficulties";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";

import { startNewGame } from "../../store/slices/gridSlice";
import { RootState } from "../../store/store";
import {
  pauseTimer,
  resetTimer,
  unpauseTimer,
} from "../../store/slices/timerSlice";

const Modal = lazy(() => import("../common/Modal/Modal"));

const GridHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const currentDifficulty = useAppSelector(
    (state: RootState) => state.grid.difficulty
  );

  const handleStartNewGame = (difficulty: Difficulty) => {
    dispatch(startNewGame(difficulty));
    dispatch(resetTimer());
    dispatch(unpauseTimer());
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (currentDifficulty === null) {
      dispatch(pauseTimer());
      setIsModalOpen(true);
    }
  }, [currentDifficulty, dispatch]);

  const displayDifficultyName = (): string => {
    switch (currentDifficulty) {
      case Difficulty.Easy:
        return "Easy";
      case Difficulty.Medium:
        return "Medium";
      case Difficulty.Hard:
        return "Hard";
      case Difficulty.Insane:
        return "Insane";
      default:
        return "Not set";
    }
  };

  const DifficultyButton = (text: string, difficulty: Difficulty) => {
    return (
      <button
        className="w-full h-10 bg-primary hover:bg-primary/70 focus:ring-4 focus:ring-primaryLight text-white rounded-lg font-semibold active:scale-[1.03] transition-all"
        onClick={() => handleStartNewGame(difficulty)}
      >
        {text}
      </button>
    );
  };

  return (
    <Fragment>
      {currentDifficulty !== null && (
        <div className="flex items-center justify-between h-10 w-full text-zinc-400 py-2 text-sm">
          <p className="space-x-1">
            <span>Difficulty:</span>
            <span className="text-zinc-600 dark:text-zinc-200 font-medium">
              {displayDifficultyName()}
            </span>
          </p>

          <button
            type="button"
            className="bg-zinc-100 dark:bg-zinc-600 dark:text-zinc-200 px-2 py-1 rounded hover:bg-primary hover:text-white transition-colors focus:ring-2 focus:ring-primaryLight"
            title="Start a new game"
            onClick={() => setIsModalOpen(true)}
          >
            New Game
          </button>
        </div>
      )}

      <Suspense fallback="Loading...">
        {isModalOpen && (
          <Modal
            noEscape
            closeOnClickOutside={currentDifficulty === null ? false : true}
            noButtons
            closeModal={() => setIsModalOpen(false)}
            customSize
            className="w-80 h-auto text-center py-4"
          >
            <div id="difficulty-selector" className="space-y-4">
              <h1 className="font-semibold text-xl text-darkGrey dark:text-zinc-100">
                New Game
              </h1>
              <section className="flex flex-col items-center px-4 space-y-3 pb-2">
                {DifficultyButton("Easy", Difficulty.Easy)}
                {DifficultyButton("Medium", Difficulty.Medium)}
                {DifficultyButton("Hard", Difficulty.Hard)}
                {DifficultyButton("Insane", Difficulty.Insane)}
              </section>
            </div>
          </Modal>
        )}
      </Suspense>
    </Fragment>
  );
};

export default GridHeader;

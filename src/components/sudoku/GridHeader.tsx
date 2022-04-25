import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";

import { RootState } from "../../store/store";
import { pauseTimer } from "../../store/slices/timerSlice";

import { displayDifficultyName } from "../../lib/utils/utils";
import DifficultySelector from "./DifficultySelector";

const Modal = lazy(() => import("../common/Modal/Modal"));

const GridHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const currentDifficulty = useAppSelector(
    (state: RootState) => state.grid.difficulty
  );

  useEffect(() => {
    // when the user enter the play route directly throug the url, prompt difficulty selection
    if (currentDifficulty === null) {
      dispatch(pauseTimer());
      setIsModalOpen(true);
    }
  }, [currentDifficulty, dispatch]);

  return (
    <Fragment>
      {currentDifficulty !== null && (
        <div className="flex items-center justify-between h-10 w-full text-zinc-400 py-2 text-sm">
          <p className="space-x-1">
            <span>Difficulty:</span>
            <span className="text-zinc-600 dark:text-zinc-200 font-medium">
              {displayDifficultyName(currentDifficulty)}
            </span>
          </p>

          <button
            type="button"
            className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-200 px-2 py-1 rounded hover:bg-primary hover:text-white dark:hover:bg-zinc-700 transition-colors focus:ring-2 focus:ring-primaryLight text-xs sm:text-sm"
            title="Start a new game"
            onClick={() => setIsModalOpen(true)}
          >
            New Game
          </button>
        </div>
      )}

      <Suspense fallback={null}>
        {isModalOpen && (
          <Modal
            noEscape={currentDifficulty === null ? true : false}
            closeOnClickOutside={currentDifficulty === null ? false : true}
            noButtons
            closeModal={() => setIsModalOpen(false)}
            customSize
            className="w-80 h-auto text-center py-4"
          >
            <DifficultySelector
              close={() => setIsModalOpen(false)}
              closeToHome={currentDifficulty === null}
            />
          </Modal>
        )}
      </Suspense>
    </Fragment>
  );
};

export default GridHeader;

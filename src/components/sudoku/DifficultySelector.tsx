import React from "react";
import { mdiArrowLeft } from "@mdi/js";
import { Link } from "react-router-dom";
import { Difficulty } from "../../lib/enums/difficulties";
import { startNewGame } from "../../store/slices/gridSlice";
import { resetTimer, unpauseTimer } from "../../store/slices/timerSlice";
import { useAppDispatch } from "../../store/storeHooks";
import Icon from "../common/Icon";

interface Props {
  /**
   * Whether the close button should redirect to the home page (when the user has not selected a difficulty yet) or only close the modal
   */
  closeToHome?: boolean;
  /**
   * Used to close the modal when selecting a difficulty, canceling, or navigating back to the home page
   */
  close: () => void;
}

const DifficultySelector = ({ closeToHome, close }: Props) => {
  const dispatch = useAppDispatch();

  const handleStartNewGame = (difficulty: Difficulty) => {
    dispatch(startNewGame(difficulty));
    dispatch(resetTimer());
    dispatch(unpauseTimer());
    close();
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
    <div id="difficulty-selector" className="space-y-4">
      <h1 className="font-semibold text-xl text-darkGrey dark:text-zinc-100">
        New Game
      </h1>
      <section className="flex flex-col items-center px-4 space-y-3 pb-2">
        {DifficultyButton("Easy", Difficulty.Easy)}
        {DifficultyButton("Medium", Difficulty.Medium)}
        {DifficultyButton("Hard", Difficulty.Hard)}
        {DifficultyButton("Insane", Difficulty.Insane)}
        <div className="w-full pt-3 border-t border-zinc-300 dark:border-zinc-600">
          <Link
            className="flex items-center justify-center w-full h-10 bg-zinc-200 dark:bg-zinc-600 hover:bg-zinc-300 hover:dark:bg-zinc-500 focus:ring-2 focus:ring-primaryLight text-zinc-500 dark:text-white rounded-lg font-semibold active:bg-slate-200 active:dark:bg-zinc-700 transition-all"
            // if difficulty is already set this button should close the modal instead of redirecting to the home page
            to={closeToHome ? "/" : "#"}
            onClick={() => {
              // if difficulty is not set, close menu menu
              if (!closeToHome) {
                close();
              }
            }}
          >
            {closeToHome && <Icon icon={mdiArrowLeft} className="w-6 h-6" />}
            <span>{closeToHome ? "Home" : "Cancel"}</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DifficultySelector;

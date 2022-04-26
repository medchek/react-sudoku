import { mdiArrowLeft, mdiStarOutline, mdiTrophy } from "@mdi/js";
import React, { Fragment, ReactNode, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { displayDifficultyName, getHintCount } from "../../lib/utils/utils";
import { resetGridState } from "../../store/slices/gridSlice";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import Icon from "../common/Icon";
import Modal from "../common/Modal/Modal";
import TimerDisplay from "../common/TimerDisplay";
import DifficultySelector from "./DifficultySelector";

interface Props {}

const RecapItem = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="flex">
      <p className="w-32 md:w-52 text-zinc-500">{title}</p>
      <div className="font-medium">{children}</div>
    </div>
  );
};

const GameWon = (props: Props) => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const difficulty = useAppSelector(
    (state: RootState) => state.grid.difficulty
  );

  const usedHelpers = useAppSelector(
    (state: RootState) => state.grid.usedHelpers
  );

  const displayUsedHelpers = (): JSX.Element => {
    type UsedHelpers = RootState["grid"]["usedHelpers"];
    const { hints, autoNotes, errorsDetector, disabledUnusable } =
      usedHelpers as UsedHelpers;

    const usedHintsPercentage =
      hints === 0 ? 0 : (hints * 100) / (81 - getHintCount(difficulty!));

    if (!hints && !autoNotes && !disabledUnusable && !errorsDetector) {
      return <span>None</span>;
    } else {
      return (
        <div className="flex flex-col">
          {hints > 0 && (
            <span>
              Hints ({hints} - {Math.ceil(usedHintsPercentage)}%)
            </span>
          )}
          {autoNotes && <span>Auto Notes</span>}
          {errorsDetector && <span>Errors Detector</span>}
          {disabledUnusable && <span>Disable Unusable</span>}
        </div>
      );
    }
  };

  return (
    <Fragment>
      <div
        id="game-completed"
        className="flex flex-col items-center justify-center w-full h-full text-zinc-100 space-y-4"
      >
        <div className="relative flex items-center justify-center w-60 h-60 ">
          <Icon icon={mdiTrophy} className="w-52 h-52 text-primary" />
          <Icon
            icon={mdiStarOutline}
            className="absolute w-10 h-10 text-primary/50 left-0 top-[60%]"
          />
          <Icon
            icon={mdiStarOutline}
            className="absolute w-5 h-5 text-primary/50 right-0 top-[10%]"
          />
          <Icon
            icon={mdiStarOutline}
            className="absolute w-7 h-7 text-primary/50 left-0 top-[10%]"
          />
          <Icon
            icon={mdiStarOutline}
            className="absolute w-8 h-8 text-primary/50 left-[50%] top-0"
          />
          <Icon
            icon={mdiStarOutline}
            className="absolute w-10 h-10 text-primary/50 right-5 bottom-[10%]"
          />
          <Icon
            icon={mdiStarOutline}
            className="absolute w-6 h-6 text-primary/50 right-0 top-[50%]"
          />
        </div>
        <p className="text-xl md:text-2xl font-semibold text-center text-zinc-700 dark:text-zinc-50">
          Congratulations, you have solved this sudoku.
        </p>
        <section
          id="game-recap"
          className="text-base md:text-xl text-primary space-y-1"
        >
          <RecapItem title="Time taken">
            <TimerDisplay />
          </RecapItem>
          <RecapItem title="Difficulty">
            {displayDifficultyName(difficulty)}
          </RecapItem>
          <RecapItem title="Used Helpers">{displayUsedHelpers()}</RecapItem>
        </section>
        <div className="flex space-x-2">
          <button
            className="py-2 px-4 rounded-md text-sm md:text-base bg-zinc-200 text-zinc-800 dark:text-zinc-50 dark:bg-zinc-800 hover:bg-primary hover:dark:bg-primary hover:text-white hover:dark:text-zinc-900 font-semibold transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            New Game
          </button>
          <Link
            to="/"
            className="flex items-center justify-center py-2 px-4 rounded-md text-sm md:text-base bg-zinc-200 text-zinc-800 dark:text-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 hover:bg-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-100 font-semibold transition-colors"
            onClick={() => dispatch(resetGridState())}
          >
            <Icon icon={mdiArrowLeft} className="w-5 h-5" />
            <span>Home</span>
          </Link>
        </div>
      </div>

      <Suspense fallback={null}>
        {isModalOpen && (
          <Modal
            closeModal={() => setIsModalOpen(false)}
            noButtons
            closeOnClickOutside
            customSize
            className="w-80 h-auto text-center py-4"
          >
            <DifficultySelector close={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </Suspense>
    </Fragment>
  );
};

export default GameWon;

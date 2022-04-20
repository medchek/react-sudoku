import React, { Fragment, useState } from "react";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import SwitchableOption from "./SwitchableOption";
import {
  toggleErrorDetector as toggleStoreErrorDetector,
  toggleDisableUnusable as toggleStoreDisableUnusable,
} from "../../store/slices/gridSlice";
import AutoNotesSwitch from "./AutoNotesSwitch";

const GridSwitches = () => {
  const [isShown, setIsShown] = useState(false);

  const isPaused = useAppSelector((state: RootState) => state.timer.isPaused);

  const isErrorDetectorOn = useAppSelector(
    (state: RootState) => state.grid.errorDetector
  );
  const isDisableUnusableOn = useAppSelector(
    (state: RootState) => state.grid.disableUnusable
  );

  const dispatch = useAppDispatch();

  const toggleErrorDetector = () => {
    dispatch(toggleStoreErrorDetector());
  };
  const toggleDisableUnusable = () => {
    dispatch(toggleStoreDisableUnusable());
  };

  return (
    <Fragment>
      <section
        id="helpers"
        className={`${
          isShown ? "block" : "hidden md:block"
        }   absolute md:relative right-0 left-0 bottom-0 top-0 h-full py-4 md:py-0  flex flex-col space-y-2 w-full md:w-40 xl:w-60 z-10 bg-white dark:bg-darkBg`}
      >
        <AutoNotesSwitch />
        <SwitchableOption
          text="Errors Detector"
          isOn={isErrorDetectorOn}
          onClick={toggleErrorDetector}
        />
        <SwitchableOption
          text="Disable unusable"
          isOn={isDisableUnusableOn}
          onClick={toggleDisableUnusable}
        />
      </section>
      <button
        type="button"
        onClick={() => setIsShown(!isShown)}
        disabled={isPaused}
        className="relative md:hidden h-8 text-sm bg-zinc-100 active:bg-primaryLight text-zinc-500/80 dark:text-zinc-200 rounded-md font-medium z-50 disabled:cursor-not-allowed disabled:text-zinc-300 dark:bg-zinc-800 disabled:bg-zinc-50 disabled:dark:opacity-20"
      >
        More
      </button>
    </Fragment>
  );
};

export default GridSwitches;

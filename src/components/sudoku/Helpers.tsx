import React, { Fragment, useState } from "react";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import SwitchableOption from "./SwitchableOption";
import {
  toggleErrorDetector as toggleStoreErrorDetector,
  toggleDisableUnusable as toggleStoreDisableUnusable,
} from "../../store/slices/gridSlice";
import AutoNotesSwitch from "./AutoNotesSwitch";
import Icon from "../common/Icon";
import { mdiClose } from "@mdi/js";

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
        className="h-full flex flex-col w-full lg:w-60 xl:w-72 z-20"
      >
        <button
          type="button"
          onClick={() => setIsShown(!isShown)}
          disabled={isPaused}
          className="relative lg:hidden flex items-center justify-center h-7 text-sm bg-zinc-100 active:bg-primaryLight text-zinc-500/80 dark:text-zinc-200 rounded-md font-medium z-50 disabled:cursor-not-allowed disabled:text-zinc-300 dark:bg-zinc-800 disabled:bg-zinc-50 disabled:dark:opacity-20 px-4 w-24 active:ring-2 ring-primary"
        >
          {!isShown ? "Helpers" : <Icon icon={mdiClose} className="w-5 h-5" />}
        </button>
        <div
          className={`absolute top-12 h-full w-full lg:relative lg:w-auto lg:top-auto space-y-2 bg-white dark:bg-darkBg lg:bg-transparent lg:dark:bg-transparent grow ${
            isShown ? "block" : "hidden lg:block"
          }`}
        >
          <AutoNotesSwitch />
          <SwitchableOption
            text="Errors Detector"
            isOn={isErrorDetectorOn}
            onClick={toggleErrorDetector}
            tooltip="Highlights cells that have the wrong solution in red."
          />
          <SwitchableOption
            text="Disable unusable"
            isOn={isDisableUnusableOn}
            onClick={toggleDisableUnusable}
            tooltip="Disables numbers that cannot go in the selected cell."
          />
        </div>
      </section>
    </Fragment>
  );
};

export default GridSwitches;

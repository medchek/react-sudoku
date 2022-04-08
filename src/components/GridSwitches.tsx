import React from "react";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";
import SwitchableOption from "./SwitchableOption";
import {
  toggleErrorDetector as toggleStoreErrorDetector,
  toggleDisableUnusable as toggleStoreDisableUnusable,
} from "../store/slices/gridSlice";
import AutoNotesSwitch from "./AutoNotesSwitch";

const GridSwitches = () => {
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
    <section id="helpers" className="space-y-2 w-60">
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
  );
};

export default GridSwitches;

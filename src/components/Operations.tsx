import React from "react";
import { toggleAutoNotes as toggleStoreAutoNotes } from "../store/slices/gridSlice";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";
import Pad from "./Pad";
import SwitchableOption from "./SwitchableOption";

const Operations = () => {
  const isAutoNotesOn = useAppSelector(
    (state: RootState) => state.grid.autoNotes
  );

  const dispatch = useAppDispatch();

  const toggleAutoNotes = () => {
    dispatch(toggleStoreAutoNotes());
  };

  return (
    <div
      id="operations"
      className="flex justify-between h-44 min-h-[11rem] py-6  border-t-2"
    >
      <section id="helpers" className="space-y-2 w-60">
        <SwitchableOption
          text="Auto Notes"
          isOn={isAutoNotesOn}
          onClick={toggleAutoNotes}
        />
        <SwitchableOption
          text="Errors Detector"
          isOn={false}
          onClick={() => null}
        />
        <SwitchableOption
          text="Disable unusable"
          isOn={false}
          onClick={() => null}
        />
      </section>
      <Pad />
      <section id="timer" className="flex flex-col items-end text-xl w-60">
        <p className="font-medium text-darkGrey">Elapsed time</p>
        <p className="text-primary">0:30</p>
      </section>
    </div>
  );
};

export default Operations;

import React from "react";
import DeleteNumberButton from "../buttons/DeleteNumberButton";
import ToggleButton from "../buttons/ToggleButton/ToggleButton";

import { useAppSelector } from "../../store/storeHooks";

import HintButton from "../buttons/HintButton";
import { RootState } from "../../store/store";
import UndoButton from "../buttons/UndoButton";

import PadNumbers from "./PadNumbers";

const Pad = () => {
  const isPaused = useAppSelector((state: RootState) => state.timer.isPaused);

  return (
    <section
      id="pad"
      className="relative z-10 flex space-x-2 md:space-x-3 justify-center"
    >
      <div className="flex flex-col space-y-2 xl:space-y-3">
        <ToggleButton text="Note Mode" disabled={isPaused} />
        <HintButton disabled={isPaused} />
      </div>
      <UndoButton disabled={isPaused} />
      <div className="grid grid-rows-2 grid-cols-5 gap-x-2 gap-y-2 xl:gap-x-3 xl:gap-y-3 ">
        <PadNumbers />
        <DeleteNumberButton disabled={isPaused} />
      </div>
    </section>
  );
};

export default Pad;

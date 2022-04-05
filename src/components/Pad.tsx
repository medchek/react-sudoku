import React from "react";
import DeleteNumberButton from "./buttons/DeleteNumberButton";
import ToggleButton from "./buttons/ToggleButton/ToggleButton";
import SetNumberButton from "./buttons/SetNumberButton";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";
import { setCellNumber } from "../store/slices/gridSlice";
import HintButton from "./buttons/HintButton";
import { RootState } from "../store/store";

const Pad = () => {
  const dispatch = useAppDispatch();
  const isPaused = useAppSelector((state: RootState) => state.timer.isPaused);

  const handleOnClick = (n: number) => {
    if (isPaused) return;
    dispatch(setCellNumber(n));
  };

  const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => (
    <SetNumberButton
      key={i}
      onClick={() => handleOnClick(n)}
      disabled={isPaused}
    >
      {n}
    </SetNumberButton>
  ));

  return (
    <section id="pad" className="flex space-x-3 ">
      <div className="flex flex-col space-y-3">
        <ToggleButton text="Note Mode" disabled={isPaused} />
        <HintButton disabled={isPaused} />
      </div>
      <div className="grid grid-rows-2 grid-cols-5 gap-x-3 gap-y-3">
        {numberButtons}
        <DeleteNumberButton disabled={isPaused} />
      </div>
    </section>
  );
};

export default Pad;

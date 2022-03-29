import React from "react";
import DeleteNumberButton from "./buttons/DeleteNumberButton";
import ToggleButton from "./buttons/ToggleButton";
import SetNumberButton from "./buttons/SetNumberButton";
import { useAppDispatch } from "../store/storeHooks";
import { setCellNumber } from "../store/slices/gridSlice";

const Pad = () => {
  const dispatch = useAppDispatch();

  const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => (
    <SetNumberButton key={i} onClick={() => dispatch(setCellNumber(n))}>
      {n}
    </SetNumberButton>
  ));
  return (
    <section id="numbers" className="flex space-x-3 ">
      <div className="flex flex-col space-y-3">
        <ToggleButton text="Note Mode" />
        <ToggleButton text="Hint" />
      </div>
      <div className="grid grid-rows-2 grid-cols-5 gap-x-3 gap-y-3">
        {numberButtons}
        <DeleteNumberButton />
      </div>
    </section>
  );
};

export default Pad;

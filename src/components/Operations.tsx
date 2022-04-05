import React from "react";
import GridSwitches from "./GridSwitches";
import Pad from "./Pad";
import Timer from "./Timer";

const Operations = () => {
  return (
    <div
      id="operations"
      className="flex justify-between h-44 min-h-[11rem] py-6  border-t-2"
    >
      <GridSwitches />
      <Pad />
      <section id="timer" className="flex flex-col items-end text-xl w-60">
        <p className="font-medium text-darkGrey">Elapsed time</p>
        <p className="text-primary">
          <Timer />
        </p>
      </section>
    </div>
  );
};

export default Operations;

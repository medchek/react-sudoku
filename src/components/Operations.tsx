import React from "react";
import GridSwitches from "./GridSwitches";
import Pad from "./Pad";
import Timer from "./Timer";

const Operations = () => {
  return (
    <div
      id="operations"
      className="relative flex flex-col-reverse md:flex-row justify-between h-60 md:h-44 min-h-[11rem] py-4 md:py-6 border-t-2 mt-2 md:mt-0"
    >
      <GridSwitches />
      <Pad />
      <section
        id="timer"
        className=" flex flex-col items-end md:text-lg xl:text-xl w-full md:w-32 xl:w-60"
      >
        <p className="hidden md:block font-medium text-darkGrey">
          Elapsed time
        </p>
        <p className="text-primary">
          <Timer />
        </p>
      </section>
    </div>
  );
};

export default Operations;

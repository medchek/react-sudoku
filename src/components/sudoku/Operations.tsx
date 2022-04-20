import React from "react";
import KeybindButton from "../buttons/KeybindButton";
import GridSwitches from "./GridSwitches";
import Pad from "./Pad";
import Timer from "./Timer";

const Operations = () => {
  return (
    <div
      id="operations"
      className="relative flex flex-col-reverse md:flex-row justify-evenly md:justify-between grow md:grow-0 max-h-64 md:max-h-fit md:h-44 min-h-[11rem] py-1 md:py-6 border-t-2 dark:border-zinc-800 mt-2 md:mt-0 md:space-y-0"
    >
      <GridSwitches />
      <Pad />
      <section
        id="timer-and-keybinds"
        className=" flex flex-row-reverse justify-between md:justify-start md:flex-col items-end md:text-lg xl:text-xl w-full md:w-32 xl:w-60"
      >
        <p className="hidden md:block font-medium text-darkGrey dark:text-zinc-50">
          Elapsed time
        </p>
        <p className="text-primary">
          <Timer />
        </p>

        <KeybindButton />
      </section>
    </div>
  );
};

export default Operations;

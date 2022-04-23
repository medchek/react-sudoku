import React from "react";
import KeybindButton from "../buttons/KeybindButton";
import Helpers from "./Helpers";
import Pad from "./Pad";
import Timer from "./Timer";

const Operations = () => {
  return (
    <div
      id="operations"
      // xl:h-44
      className="relative flex flex-col lg:flex-row justify-start lg:justify-between py-2 lg:py-6 border-t-2 dark:border-zinc-800"
    >
      <section className="flex justify-between h-10 lg:h-full items-start w-full">
        <Helpers />
        <section
          id="timer-and-keybinds"
          className="relative z-50 flex flex-row-reverse justify-start md:flex-col items-end md:text-lg xl:text-xl w-full md:w-32 xl:w-60"
        >
          <p className="hidden lg:block font-medium text-darkGrey dark:text-zinc-50">
            Elapsed time
          </p>
          <p className="text-primary">
            <Timer />
          </p>
          <KeybindButton />
        </section>
      </section>
      <section
        id="pad-container"
        className="lg:absolute lg:left-10 xl:left-auto bottom-2 w-full"
      >
        <Pad />
      </section>
    </div>
  );
};

export default Operations;

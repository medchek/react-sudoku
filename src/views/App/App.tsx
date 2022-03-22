import React from "react";
import Grid from "../../components/Grid";
import Logo from "../../components/svgs/Logo";
import SwitchableOption from "../../components/SwitchableOption";
import Operations from "../../components/Operations";

const App = () => {
  return (
    <div className="flex flex-col px-72 h-screen max-h-screen min-h-screen w-screen overflow-hidden">
      <header className="w-full h-14 min-h-[3.5rem] pt-3">
        <a className="flex items-center space-x-3 w-44" href=".">
          <Logo className="w-10 h-10" />
          <span className="font-semibold text-darkGrey text-3xl">Sudoku</span>
        </a>
      </header>
      {/* mt-14 */}
      <main className="flex flex-col justify-between grow">
        <div
          id="grid-display"
          className="grow flex items-center justify-center"
        >
          <Grid />
        </div>
        <div
          id="operations"
          className="flex justify-between h-44 min-h-[11rem] py-6  border-t-2"
        >
          <section id="helpers" className="space-y-2">
            <SwitchableOption text="Auto notes" />
            <SwitchableOption text="Errors Detector" />
            <SwitchableOption text="Remove unusable" />
          </section>
          <Operations />
          <section id="timer" className="text-xl">
            <p className="font-medium text-darkGrey">Elapsed time</p>
            <p className="text-primary text-right">0:30</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;

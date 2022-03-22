import React from "react";
import DeleteNumberButton from "./buttons/DeleteNumberButton";
import SwitchButton from "./buttons/SwitchButton";
import SetNumberButton from "./buttons/SetNumberButton";

const Operations = () => {
  const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => (
    <SetNumberButton key={i}>{n}</SetNumberButton>
  ));
  return (
    <section id="numbers" className="flex space-x-3">
      <div className="flex flex-col space-y-3">
        <SwitchButton text="Note Mode" />
        <SwitchButton text="Hint" />
      </div>
      <div className="grid grid-rows-2 grid-cols-5 gap-x-3 gap-y-3">
        {numberButtons}
        <DeleteNumberButton />
      </div>
    </section>
  );
};

export default Operations;

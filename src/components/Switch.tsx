import React from "react";

interface Props {
  isOn: boolean;
  onClick: () => void;
}

const Switch = ({ isOn, onClick }: Props) => {
  return (
    <button
      className="flex items-center relative w-11 h-6 "
      onClick={onClick}
      type="button"
    >
      <div
        className={`${
          isOn ? "bg-[#c8f5e2]" : "bg-[#ededed]"
        } w-16 h-5 rounded-full transition-colors`}
      ></div>
      <span
        className={`${
          isOn ? "left-[50%] bg-primary" : "left-0 bg-[#9C9C9C]"
        } absolute h-6 w-6 rounded-full transition-all`}
      ></span>
    </button>
  );
};

export default Switch;

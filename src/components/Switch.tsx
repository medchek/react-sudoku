import React from "react";

interface Props {
  isOn: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const Switch = ({ isOn, onClick, disabled }: Props) => {
  return (
    <button
      className="flex items-center relative w-11 h-6 disabled:cursor-not-allowed"
      onClick={onClick}
      type="button"
      disabled={disabled ?? false}
    >
      <span
        className={`${
          isOn ? "bg-[#c8f5e2]" : "bg-[#ededed]"
        } w-16 h-5 rounded-full transition-colors`}
      ></span>
      <span
        className={`${isOn ? "left-[50%] bg-primary" : "left-0 bg-[#9C9C9C]"} ${
          disabled ? "!bg-zinc-300" : ""
        }
        absolute h-6 w-6 rounded-full transition-all`}
      ></span>
    </button>
  );
};

export default Switch;

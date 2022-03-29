import React from "react";
import Switch from "./Switch";

interface Props {
  text: string;
  onClick: () => void;
  isOn: boolean;
}

const SwitchableOption = ({ text, isOn, onClick }: Props) => {
  return (
    <div className="flex items-center space-x-5">
      <Switch isOn={isOn} onClick={onClick} />{" "}
      <p className="text-darkGrey text-lg">{text}</p>
    </div>
  );
};

export default SwitchableOption;

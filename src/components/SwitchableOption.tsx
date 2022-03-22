import React from "react";
import Switch from "./Switch";

interface Props {
  text: string;
}

const SwitchableOption = ({ text }: Props) => {
  return (
    <div className="flex items-center space-x-5">
      <Switch /> <p className="text-darkGrey text-lg">{text}</p>
    </div>
  );
};

export default SwitchableOption;

import React from "react";
import { RootState } from "../store/store";
import { useAppSelector } from "../store/storeHooks";
import Switch from "./Switch";

interface Props {
  text: string;
  onClick: () => void;
  isOn: boolean;
}

const SwitchableOption = ({ text, isOn, onClick }: Props) => {
  const isPaused = useAppSelector((state: RootState) => state.timer.isPaused);

  return (
    <div className="flex items-center space-x-5">
      <Switch isOn={isOn} onClick={onClick} disabled={isPaused} />{" "}
      <p className="text-darkGrey text-lg">{text}</p>
    </div>
  );
};

export default SwitchableOption;

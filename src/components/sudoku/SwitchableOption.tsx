import React from "react";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../store/storeHooks";
import Switch from "../common/Switch";

interface Props {
  text: string;
  onClick: () => void;
  isOn: boolean;
}

const SwitchableOption = ({ text, isOn, onClick }: Props) => {
  const isPaused = useAppSelector((state: RootState) => state.timer.isPaused);

  return (
    <div className="flex items-center space-x-2 lg:space-x-5">
      <Switch isOn={isOn} onClick={onClick} disabled={isPaused} />{" "}
      <p
        className={`text-darkGrey dark:text-zinc-50 xl:text-lg ${
          isPaused ? "opacity-30" : ""
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default SwitchableOption;

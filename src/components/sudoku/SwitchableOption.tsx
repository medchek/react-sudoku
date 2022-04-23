import React from "react";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../store/storeHooks";
import InfoTooltip from "../common/InfoTooltip";
import Switch from "../common/Switch";

interface Props {
  text: string;
  onClick: () => void;
  isOn: boolean;
  readonly tooltip?: string;
}

const SwitchableOption = ({ text, isOn, onClick, tooltip }: Props) => {
  const isPaused = useAppSelector((state: RootState) => state.timer.isPaused);

  return (
    <div className="flex items-center space-x-2 lg:space-x-5">
      <Switch isOn={isOn} onClick={onClick} disabled={isPaused} />{" "}
      <p
        className={`flex items-center text-darkGrey dark:text-zinc-50 xl:text-lg space-x-2 ${
          isPaused ? "opacity-30" : ""
        }`}
      >
        <span>{text}</span>
        {tooltip && tooltip.length > 0 && <InfoTooltip text={tooltip} />}
      </p>
    </div>
  );
};

export default SwitchableOption;

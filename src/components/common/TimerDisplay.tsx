import React from "react";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../store/storeHooks";

interface Props {
  className?: string;
}
const addZeroToSingleNumber = (n: number) => (n <= 9 ? `0${n}` : n);

const TimerDisplay = ({ className }: Props) => {
  const seconds = useAppSelector((state: RootState) => state.timer.seconds);
  const minutes = useAppSelector((state: RootState) => state.timer.minutes);
  const hours = useAppSelector((state: RootState) => state.timer.hours);

  return (
    <span className={className}>
      {hours !== 0 && addZeroToSingleNumber(hours) + ":"}
      {addZeroToSingleNumber(minutes)}:{addZeroToSingleNumber(seconds)}
    </span>
  );
};

export default TimerDisplay;

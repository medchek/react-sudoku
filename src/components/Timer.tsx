import { mdiPause, mdiPlay } from "@mdi/js";
import React, { useEffect, useState } from "react";
import { togglePauseTimer } from "../store/slices/timerSlice";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";
import Icon from "./Icon";

const addZeroToSingleNumber = (n: number) => (n <= 9 ? `0${n}` : n);

const Timer = () => {
  const isPaused = useAppSelector((state: RootState) => state.timer.isPaused);
  const dispatch = useAppDispatch();

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const handleOnClick = () => {
    dispatch(togglePauseTimer());
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      // go to next minute
      if (seconds + 1 === 60) {
        // reset seconds
        setSeconds(0);
        // go to next hour if minutes + 1 === 60
        if (minutes + 1 === 60) {
          // reset minutes back to 0 and move to next hour
          setMinutes(0);
          setHours(hours + 1);
        } else {
          setMinutes(minutes + 1);
        }
      } else {
        // regular seconds increment
        setSeconds(seconds + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes, hours, isPaused]);

  return (
    <span className="space-x-2 flex items-center">
      <span>
        {hours !== 0 && addZeroToSingleNumber(hours) + ":"}
        {addZeroToSingleNumber(minutes)}:{addZeroToSingleNumber(seconds)}
      </span>
      <button
        title={isPaused ? "Continue" : "Pause the game"}
        className="bg-slate-100 w-6 h-6 rounded-md flex items-center justify-center hover:bg-slate-200 active:bg-slate-200 outline-none active:ring-1 ring-primary/70"
        onClick={handleOnClick}
      >
        <Icon className="w-5 h-5" icon={isPaused ? mdiPlay : mdiPause} />
      </button>
    </span>
  );
};

export default Timer;

import { mdiPause, mdiPlay } from "@mdi/js";
import React, { useEffect } from "react";
import {
  togglePauseTimer,
  setSeconds as setStoreSeconds,
  setMinutes as setStoreMinutes,
  setHours as setStoreHours,
} from "../../store/slices/timerSlice";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import Icon from "../common/Icon";
import TimerDisplay from "../common/TimerDisplay";

const Timer = () => {
  const isPaused = useAppSelector((state: RootState) => state.timer.isPaused);
  const isTabFocused = useAppSelector(
    (state: RootState) => state.ui.isTabFocused
  );

  const difficulty = useAppSelector(
    (state: RootState) => state.grid.difficulty
  );
  const dispatch = useAppDispatch();

  const seconds = useAppSelector((state: RootState) => state.timer.seconds);
  const minutes = useAppSelector((state: RootState) => state.timer.minutes);
  const hours = useAppSelector((state: RootState) => state.timer.hours);

  const handleOnClick = () => {
    // if the game has not started yet, don't do anything
    if (difficulty === null) return;
    dispatch(togglePauseTimer());
  };

  useEffect(() => {
    if (isPaused || difficulty === null || !isTabFocused) return;

    const setSeconds = (n: number) => dispatch(setStoreSeconds(n));

    const setMinutes = (n: number) => dispatch(setStoreMinutes(n));

    const setHours = (n: number) => dispatch(setStoreHours(n));

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
  }, [seconds, minutes, hours, isPaused, isTabFocused, difficulty, dispatch]);

  return (
    <span className="space-x-2 flex items-center">
      <TimerDisplay />
      <button
        disabled={difficulty === null}
        title={isPaused ? "Continue" : "Pause the game"}
        className="bg-slate-100 w-6 h-6 rounded-md flex items-center justify-center hover:bg-slate-200 active:bg-slate-200 dark:bg-zinc-800 outline-none active:ring-1 ring-primary/70"
        onClick={handleOnClick}
      >
        <Icon className="w-5 h-5" icon={isPaused ? mdiPlay : mdiPause} />
      </button>
    </span>
  );
};

export default Timer;

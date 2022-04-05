import React from "react";
import { unpauseTimer } from "../store/slices/timerSlice";
import { useAppDispatch } from "../store/storeHooks";

const Paused = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(unpauseTimer());
  };

  return (
    <div
      id="pause-screen"
      className="flex flex-col items-center justify-center absolute top-0 bottom-0 left-0 right-0 w-full h-full border-4 border-primaryLight z-100 bg-white space-y-2"
    >
      <p className="font-medium text-2xl text-darkGrey w-1/2 text-center">
        The game is currenty <span className="font-bold">paused</span>
      </p>
      <button
        type="button"
        onClick={handleOnClick}
        className="bg-slate-50 px-2 py-1 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-200/70 hover:text-slate-700 active:text-primary transition-colors"
      >
        Continue
      </button>
    </div>
  );
};

export default Paused;

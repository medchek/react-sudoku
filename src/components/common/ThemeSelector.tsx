import React, { useEffect } from "react";
import { mdiWeatherNight, mdiWeatherSunny } from "@mdi/js";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../../store/slices/uiSlice";
import { useAppSelector } from "../../store/storeHooks";
import { RootState } from "../../store/store";

const ThemeSelector = () => {
  const dispatch = useDispatch();
  const isDarkMode = useAppSelector((state: RootState) => state.ui.isDarkMode);

  const handleOnClick = () => {
    dispatch(toggleDarkMode());
  };
  useEffect(() => {
    localStorage.setItem("isDark", isDarkMode ? "1" : "0");
  }, [isDarkMode]);

  return (
    <button
      className="flex justify-center items-center relative z-[100] w-9 h-9 bg-primaryLight dark:bg-zinc-800 dark:text-primaryLight active:bg-primaryLight/70 text-darkGrey rounded-md"
      onClick={handleOnClick}
    >
      <Icon
        icon={isDarkMode ? mdiWeatherNight : mdiWeatherSunny}
        className="w-7 h-7"
      />
    </button>
  );
};

export default ThemeSelector;

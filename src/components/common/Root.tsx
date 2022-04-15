import React, { ReactNode } from "react";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../store/storeHooks";

interface Props {
  children: ReactNode;
}

const Root = ({ children }: Props) => {
  const isDarkMode = useAppSelector((state: RootState) => state.ui.isDarkMode);

  return (
    <div
      className={`h-screen max-h-screen min-h-screen w-screen overflow-hidden ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Root;

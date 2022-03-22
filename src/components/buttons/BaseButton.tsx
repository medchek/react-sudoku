import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className: string;
  onClick?: () => void;
  customColors?: boolean;
}

const BaseButton = ({ children, className, onClick, customColors }: Props) => {
  return (
    <button
      className={`relative flex justify-center items-center w-14 h-14 rounded-md shadow-md active:scale-[1.03] ${className} ${
        !customColors ? "bg-buttonGrey" : ""
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default BaseButton;

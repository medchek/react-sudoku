import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className: string;
  onClick?: () => void;
  customColors?: boolean;
  disable?: boolean;
}

const BaseButton = ({
  children,
  className,
  onClick,
  disable,
  customColors,
}: Props) => {
  return (
    <button
      className={`relative flex justify-center border border-slate-200/50 items-center w-12 h-12 sm:w-14 sm:h-14 rounded-md shadow-md active:scale-[1.03] disabled:cursor-not-allowed  disabled:ring-0 disabled:text-zinc-300 outline-none ${className} ${
        !customColors ? "bg-white" : ""
      }`}
      onClick={onClick}
      type="button"
      disabled={disable ?? false}
    >
      {children}
    </button>
  );
};

export default BaseButton;

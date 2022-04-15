import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className: string;
  onClick?: () => void;
  customColors?: boolean;
  disable?: boolean;
  noBorder?: boolean;
}

const BaseButton = ({
  children,
  className,
  onClick,
  disable,
  customColors,
  noBorder,
}: Props) => {
  return (
    <button
      className={`relative flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 rounded-md shadow-md active:scale-[1.03] disabled:cursor-not-allowed  disabled:ring-0  outline-none ${className} ${
        !customColors
          ? "bg-white dark:bg-zinc-900 text-darkGrey dark:text-zinc-50  disabled:text-zinc-300 dark:disabled:opacity-30 dark:disabled:text-zinc-700"
          : ""
      } ${
        noBorder === undefined || noBorder === false
          ? "border border-slate-200/50 dark:border-zinc-700"
          : ""
      }
      `}
      onClick={onClick}
      type="button"
      disabled={disable ?? false}
    >
      {children}
    </button>
  );
};

export default BaseButton;

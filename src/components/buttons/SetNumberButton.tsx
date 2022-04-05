import React, { ReactNode } from "react";
import BaseButton from "./BaseButton";

interface Props {
  children: ReactNode;
  onClick: () => void;
  disabled: boolean;
}

const SetNumberButton = ({ children, onClick, disabled }: Props) => {
  return (
    <BaseButton
      onClick={onClick}
      className="bg-white font-semibold text-2xl text-darkGrey  transition-all hover:ring-2 ring-primary/70 active:text-primary/70"
      disable={disabled}
    >
      {children}
    </BaseButton>
  );
};

export default SetNumberButton;

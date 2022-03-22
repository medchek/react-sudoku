import React, { ReactNode } from "react";
import BaseButton from "./BaseButton";

interface Props {
  children: ReactNode;
}

const SetNumberButton = ({ children }: Props) => {
  return (
    <BaseButton className=" bg-buttonGrey font-semibold text-2xl text-darkGrey transition-colors hover:ring-2 ring-primaryLight active:bg-white ">
      {children}
    </BaseButton>
  );
};

export default SetNumberButton;

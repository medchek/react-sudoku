import React from "react";
import { revealHint } from "../../store/slices/gridSlice";
import { useAppDispatch } from "../../store/storeHooks";

import BaseButton from "./BaseButton";

interface Props {
  disabled: boolean;
}

const HintButton = ({ disabled }: Props) => {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    if (disabled) return;
    dispatch(revealHint());
  };

  return (
    <BaseButton
      className="font-bold text-sm text-[#9C9C9C] active:text-primary/70 hover:ring-2 hover:ring-primary/70 transition-all"
      onClick={handleOnClick}
      disable={disabled}
    >
      Hint
    </BaseButton>
  );
};

export default HintButton;

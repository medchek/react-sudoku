import { mdiUndoVariant } from "@mdi/js";
import React from "react";
import { undo } from "../../store/slices/gridSlice";
import { useAppDispatch } from "../../store/storeHooks";
import Icon from "../common/Icon";
import BaseButton from "./BaseButton";

interface Props {
  disabled: boolean;
}

const UndoButton = ({ disabled }: Props) => {
  const dispatch = useAppDispatch();

  const handleUndo = () => {
    dispatch(undo());
  };
  return (
    <BaseButton
      className="h-full flex-col-reverse px-1 md:px-2 font-semibold active:ring-2 md:hover:ring-2 ring-primary/80 active:!text-primary text-sm md:text-base"
      customSize
      onClick={handleUndo}
      disable={disabled}
    >
      <span>Undo</span>
      <Icon icon={mdiUndoVariant} className="w-6 h-6" />
    </BaseButton>
  );
};

export default UndoButton;

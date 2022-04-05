import React from "react";
import Icon from "../Icon";
import { mdiCloseBoxOutline } from "@mdi/js";
import BaseButton from "./BaseButton";
import { useAppDispatch } from "../../store/storeHooks";
import { resetCellNumber } from "../../store/slices/gridSlice";

interface Props {
  disabled: boolean;
}

const DeleteNumberButton = ({ disabled }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <BaseButton
      onClick={() => dispatch(resetCellNumber())}
      className="bg-buttonGrey font-semibold text-base transition-colors hover:ring-2 ring-red-500/70 active:bg-red-400 text-[#D98484] active:text-white"
      disable={disabled}
    >
      <Icon className="w-7 h-7 " icon={mdiCloseBoxOutline} />
    </BaseButton>
  );
};

export default DeleteNumberButton;

import React from "react";
import Icon from "../Icon";
import { mdiCloseBoxOutline } from "@mdi/js";
import BaseButton from "./BaseButton";
import { useAppDispatch } from "../../store/storeHooks";
import { resetCellNumber } from "../../store/slices/gridSlice";

const DeleteNumberButton = () => {
  const dispatch = useAppDispatch();

  return (
    <BaseButton
      onClick={() => dispatch(resetCellNumber())}
      className="bg-buttonGrey font-semibold text-base transition-colors hover:ring-2 ring-red-400/50 active:bg-red-400 text-[#D98484] active:text-white"
    >
      <Icon className="w-7 h-7 " icon={mdiCloseBoxOutline} />
    </BaseButton>
  );
};

export default DeleteNumberButton;

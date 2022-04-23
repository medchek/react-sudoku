import { mdiInformationOutline } from "@mdi/js";
import React from "react";
import Icon from "./Icon";

interface Props {
  text: string;
}

const InfoTooltip = ({ text }: Props) => {
  return (
    <button
      data-tooltip={text}
      className="relative before:w-60 md:before:w-60 before:hidden hover:before:block before:absolute before:bottom-7 before:-left-24 md:before:left-auto before:text-zinc-700 dark:before:text-zinc-100 before:bg-white dark:before:bg-zinc-800  before:content-[attr(data-tooltip)] before:text-left before:p-2 before:rounded-lg before:shadow-lg before:text-sm lg:before:text-base before:z-[100] text-zinc-400 hover:text-zinc-500 before:border before:border-zinc-100 dark:before:border-zinc-700"
    >
      <Icon icon={mdiInformationOutline} className="w-5 h-5" />
    </button>
  );
};

export default InfoTooltip;

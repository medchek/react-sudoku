import React, { useState } from "react";
import BaseButton from "./BaseButton";
import styles from "./SwitchButton.module.css";

interface Props {
  text: string;
}

const SwitchButton = ({ text }: Props) => {
  const [isOn, setIsOn] = useState(false);

  const handleOnClick = () => {
    setIsOn(!isOn);
  };

  return (
    <BaseButton
      className={`${
        isOn
          ? "bg-white text-primary ring-2 ring-primary/70"
          : "text-[#9C9C9C] hover:ring-2 hover:ring-lightGrey"
      } font-bold text-sm  transition-colors `}
      customColors
      onClick={handleOnClick}
    >
      {text}
      {isOn && (
        <span
          className={`absolute w-5 h-5 bg-primary rounded-full shadow-md -top-2 -right-2 ${styles["animate-scale"]}`}
        ></span>
      )}
    </BaseButton>
  );
};

export default SwitchButton;

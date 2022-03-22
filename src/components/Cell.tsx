import React from "react";

interface Props {
  value: number;
  row: number;
  col: number;
}

const Cell = ({ value, col, row }: Props) => {
  const handleMouseEnter = () => {
    console.log("mouse enter fired!");
  };

  return (
    <div
      className={[
        // "flex items-center justify-center w-[84px] h-[84px] ",
        "flex items-center justify-center w-[70px] h-[70px] text-[1.7rem] font-medium text-darkGrey hover:bg-primaryLight/30 cursor-pointer",
        row === 0 && "border-t-4 border-primaryLight",
        (row === 8 || row === 2 || row === 5) &&
          "border-b-4 border-primaryLight",
        (row === 0 ||
          row === 1 ||
          row === 3 ||
          row === 4 ||
          row === 6 ||
          row === 7) &&
          "border-b-2 border-b-lightGrey",
        col === 0 && "border-l-4 border-primaryLight",
        (col === 0 ||
          col === 1 ||
          col === 3 ||
          col === 4 ||
          col === 6 ||
          col === 7) &&
          "border-r-2 border-r-lightGrey",
        (col === 8 || col === 2 || col === 5) &&
          "border-r-4 border-primaryLight",
      ]
        .join(" ")
        .trim()}
      onMouseOver={handleMouseEnter}
    >
      {value}
    </div>
  );
};

export default Cell;

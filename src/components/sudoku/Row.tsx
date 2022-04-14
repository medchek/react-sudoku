import React from "react";
import { CellState } from "../../store/slices/gridSlice";
import Cell from "./Cell";

interface Props {
  row: CellState[];
  rowIndex: number;
}

const Row = ({ row, rowIndex }: Props) => {
  return (
    // <div className="flex hover:bg-slate-50">
    <div className="flex w-full grow">
      {row.map((cell, colIndex) => (
        <Cell
          row={rowIndex}
          col={colIndex}
          cell={cell}
          key={`${rowIndex}-${colIndex}`}
        />
      ))}
    </div>
  );
};

export default Row;

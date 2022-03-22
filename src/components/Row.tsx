import React from "react";
import Cell from "./Cell";

interface Props {
  row: number[];
  rowIndex: number;
}

const Row = ({ row, rowIndex }: Props) => {
  return (
    <div className="flex hover:bg-slate-50" key={rowIndex}>
      {row.map((col, colIndex) => (
        <Cell
          row={rowIndex}
          col={colIndex}
          value={col}
          key={`${rowIndex}-${colIndex}`}
        />
      ))}
    </div>
  );
};

export default Row;

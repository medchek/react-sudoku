import React from "react";
import Row from "./Row";

type Props = {};

const Grid = (props: Props) => {
  const grid: number[][] = [
    [5, 9, 8, 6, 2, 3, 1, 4, 7],
    [7, 4, 3, 1, 5, 8, 2, 9, 6],
    [2, 6, 1, 4, 7, 9, 3, 5, 8],
    [8, 1, 7, 5, 4, 2, 9, 6, 3],
    [9, 3, 4, 8, 6, 7, 5, 1, 2],
    [6, 2, 5, 3, 9, 1, 7, 8, 4],
    [1, 8, 9, 7, 3, 4, 6, 2, 5],
    [3, 5, 2, 9, 8, 6, 4, 7, 1],
    [4, 7, 6, 2, 1, 5, 8, 3, 9],
  ];

  const displayGrid = grid.map((row, rowIndex) => {
    return <Row row={row} rowIndex={rowIndex} />;
  });

  return (
    <div id="grid" className="flex flex-col items-center justify-center">
      {displayGrid}
    </div>
  );
};

export default Grid;

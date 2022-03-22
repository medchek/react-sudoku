import * as React from "react";

interface Props {
  className: string;
}

const SvgComponent = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 44 44"
    preserveAspectRatio="none"
    {...props}
  >
    <g stroke="#00ff97" strokeWidth={2}>
      <g data-name="Rectangle 11" fill="rgba(255,255,255,0)">
        <rect width={44} height={44} rx={4} stroke="none" />
        <rect x={1} y={1} width={42} height={42} rx={3} fill="none" />
      </g>
      <path data-name="Line 6" fill="none" d="M15 0v42" />
      <path data-name="Line 7" fill="none" d="M29 0v42" />
      <path data-name="Line 8" fill="none" d="M1 15h42" />
      <path data-name="Line 9" fill="none" d="M1 29h42" />
    </g>
  </svg>
);

export default SvgComponent;

import React, { SVGProps } from "react";

const FirstFeature = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={550.529}
    viewBox="0 0 550.529 531.29"
    preserveAspectRatio="none"
    {...props}
  >
    <defs>
      <filter
        id="a"
        x={0}
        y={0}
        width={202.727}
        height={202.727}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} />
        <feGaussianBlur stdDeviation={4.5} result="blur" />
        <feFlood floodColor="#00ff97" floodOpacity={0.149} />
        <feComposite operator="in" in2="blur" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g transform="translate(-1191.916 -907.083)">
      <rect
        data-name="Rectangle 20"
        width={245}
        height={245}
        rx={20}
        transform="translate(1497.445 1193.373)"
        className="fill-[#cfffec] dark:fill-primary"
      />
      <rect
        data-name="Rectangle 21"
        width={145}
        height={145}
        rx={20}
        transform="translate(1569.445 965.373)"
        className="fill-[#f9f9f9] dark:fill-[#272727]"
      />
      <rect
        data-name="Rectangle 22"
        width={233}
        height={233}
        rx={20}
        transform="translate(1225.445 1190.373)"
        className="fill-[#EFFFFA] dark:fill-[#232323]"
      />
      <g strokeWidth={6}>
        <g
          data-name="grid-square-bg-rect-16"
          transform="translate(1273.445 992.373)"
          fill="#fff"
          stroke="#00ff97"
          className="fill-white dark:fill-[#171717]"
        >
          <rect width={402} height={401} rx={18} stroke="none" />
          <rect x={3} y={3} width={396} height={395} rx={15} fill="none" />
        </g>
        <path
          data-name="Line 2"
          fill="none"
          className="stroke-[#D5FFF1] dark:stroke-[#2F2F2F]"
          d="M1280.452 1259.277h387.581"
        />
        <path
          data-name="Line 3"
          fill="none"
          stroke="rgba(188,255,232,0.99)"
          className="stroke-[#D5FFF1] dark:stroke-[#2F2F2F]"
          d="M1280.452 1126.044h387.581"
        />
        <path
          data-name="Path 1"
          d="M1408.415 998.957v387.731"
          fill="none"
          className="stroke-[#D5FFF1] dark:stroke-[#2F2F2F]"
        />
        <path
          data-name="Line 5"
          fill="none"
          className="stroke-[#D5FFF1] dark:stroke-[#2F2F2F]"
          d="M1541.607 998.864v387.581"
        />
      </g>
      <g data-name="tilted-square-4">
        <g transform="matrix(1 0 0 1 1191.92 907.084)" filter="url(#a)">
          <g
            data-name="Path 12"
            fill="#fff"
            className="fill-white dark:fill-[#161616]"
          >
            <path d="m24.29 58.28 101.788-43.206a11.721 11.721 0 0 1 15.369 6.21l43.206 101.788a11.721 11.721 0 0 1-6.21 15.365l-101.79 43.207a11.721 11.721 0 0 1-15.367-6.206L18.08 73.649a11.721 11.721 0 0 1 6.21-15.369Z" />
            <path
              d="M25.461 61.042c-4.426 1.879-6.499 7.008-4.62 11.435l43.205 101.785c1.88 4.426 7.009 6.499 11.435 4.62l101.785-43.205c4.426-1.88 6.499-7.009 4.62-11.435L138.681 22.457c-1.879-4.427-7.009-6.5-11.435-4.62L25.461 61.042M24.29 58.28l101.785-43.205c5.959-2.53 12.84.25 15.368 6.21l43.206 101.785c2.529 5.958-.251 12.839-6.21 15.368L76.653 181.643c-5.958 2.53-12.839-.25-15.368-6.21L18.08 73.65c-2.53-5.959.25-12.84 6.209-15.369Z"
              fill="rgba(188,255,232,0.99)"
            />
          </g>
        </g>
        <text
          data-name={4}
          transform="rotate(-23 3183.633 -2630.007)"
          className="fill-[#171717] dark:fill-white"
          fontSize={72}
          fontFamily="Poppins-Regular, Poppins"
        >
          <tspan x={0} y={0}>
            {"4"}
          </tspan>
        </text>
      </g>
      <text
        data-name={2}
        transform="translate(1327.445 1344.373)"
        className="fill-[#171717] dark:fill-white"
        fontSize={59}
        fontFamily="Poppins-Medium, Poppins"
        fontWeight={500}
      >
        <tspan x={0} y={0}>
          {"2"}
        </tspan>
      </text>
      <text
        data-name={9}
        transform="translate(1454.445 1212.373)"
        className="fill-[#171717] dark:fill-white"
        fontSize={61}
        fontFamily="Poppins-Medium, Poppins"
        fontWeight={500}
      >
        <tspan x={0} y={0}>
          {"9"}
        </tspan>
      </text>
    </g>
  </svg>
);

export default FirstFeature;

import React from "react";
import { Link } from "react-router-dom";
import Logo from "../svgs/Logo";
const HeaderLogo = () => {
  return (
    <Link
      to="/"
      className="relative flex items-center space-x-2 xl:space-x-3 w-44 z-[100]"
    >
      <Logo className="w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10" />
      <span className="font-semibold text-darkGrey dark:text-white text-2xl xl:text-3xl">
        Sudoku
      </span>
    </Link>
  );
};

export default HeaderLogo;

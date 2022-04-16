import React from "react";
import Logo from "../svgs/Logo";
type Props = {};

const RouteLoader = (props: Props) => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-white dark:bg-darkBg">
      <Logo className="w-24 h-24 animate-pulse" />
    </div>
  );
};

export default RouteLoader;

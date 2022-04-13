import React from "react";
import { mdiFlare, mdiWeatherNight } from "@mdi/js";
import Icon from "../common/Icon";

const ThridFeature = () => (
  <div className="relative flex justify-center items-center w-[531px] h-[547px] ">
    <div className="absolute w-[180px] h-[180px] bg-primaryLight right-5 top-0"></div>
    <div className="absolute w-[180px] h-56 bg-primary left-0"></div>
    <div className="absolute w-40 h-40 bg-primary right-0 bottom-0"></div>

    <div className="relative z-10 flex items-center justify-center w-[460px] h-[460px] dark:from-[#171717] dark:to-[#0A0A0A] bg-gradient-to-b to-[#000D20] from-[#000813] rounded-[29px] text-primaryLight">
      <Icon
        icon={mdiWeatherNight}
        className="relative w-[338px] h-[338px] text-primary"
      />
      {/* STARS */}

      <Icon
        icon={mdiFlare}
        className="absolute w-10 h10 scale-50 translate-x-5 translate-y-2 animate-pulse"
      />
      <Icon
        icon={mdiFlare}
        className="absolute w-10 h10  scale-75 rotate-45 translate-x-28 -translate-y-20"
      />
      <Icon
        icon={mdiFlare}
        className="absolute w-10 h10  scale-[0.85] rotate-6  top-[8%] right-[30%] translate-x-20 animate-pulse"
      />
      <Icon
        icon={mdiFlare}
        className="absolute w-10 h10 scale-[0.6] rotate-12 top-[5%] -translate-x-16 animate-pulse"
      />
      <Icon
        icon={mdiFlare}
        className="absolute w-10 h10  -rotate-12 left-[6%] scale-105 -translate-y-16 animate-pulse"
      />
      <Icon
        icon={mdiFlare}
        className="absolute w-10 h10 rotate-12 left-[10%] scale-50 translate-y-16 animate-pulse"
      />
      <Icon
        icon={mdiFlare}
        className="absolute w-10 h10 rotate-6 left-[5%] scale-75 bottom-[15%]"
      />
      <Icon
        icon={mdiFlare}
        className="absolute w-10 h10 -rotate-6 scale-90 -translate-x-4 bottom-[5%] animate-pulse"
      />
      <Icon
        icon={mdiFlare}
        className="absolute w-10 h10 scale-[.8] -translate-x-4 bottom-[13%] right-[8%] animate-pulse"
      />
    </div>
  </div>
);

export default ThridFeature;
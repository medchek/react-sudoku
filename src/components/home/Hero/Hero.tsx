import React, { Fragment } from "react";
import styles from "./Hero.module.css";
import heroImage from "../../assets/hero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Fragment>
      <div
        id="hero"
        className="flex justify-between items-center h-[720px] w-full bg-[#FAFAFA] dark:bg-[#010101] "
      >
        <section
          id="cta"
          className="flex flex-col justify-center space-y-8 w-1/2 h-full pl-36"
        >
          <p className="w-[590px] font-bold text-6xl">
            Enjoy a brain tease with a Sudoku
          </p>
          <Link
            to="/play"
            className="text-lg font-semibold bg-white text-primary h-14 shadow-lg flex items-center justify-center rounded-lg  w-44 active:scale-103 transition-all hover:bg-zinc-100"
          >
            Start a Game
          </Link>
        </section>
        <section id="illustartion" className="relative w-1/2 h-full">
          <div
            id="first-rect"
            className={`absolute bottom-0 w-full h-full bg-primary ${styles["first-rect"]} z-20`}
          ></div>
          <div
            id="second-rect"
            className={`absolute bottom-0 w-full h-full bg-[#00E185] ${styles["second-rect"]} z-10`}
          ></div>
          <div
            id="thrid-rect"
            className={`absolute bottom-0 w-full h-full bg-[#18C57E] ${styles["third-rect"]}`}
          ></div>
          <div
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom",
              bottom: ".5px",
            }}
            className="relative z-50 w-full h-full"
          />
        </section>
      </div>
      <div id="hero-bottom" className="flex justify-end w-full h-28">
        <div
          className={`w-1/2 h-full bg-[#F3F3F3] dark:dark:bg-[#010101] ${styles["hero-bottom-react"]}`}
        ></div>
      </div>
    </Fragment>
  );
};

export default Hero;

import React, { Fragment } from "react";
import styles from "./Hero.module.css";
import heroImage from "../../../assets/hero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Fragment>
      <div
        id="hero"
        className="flex justify-end items-center h-[600px] 2xl:h-[720px] w-full bg-[#FAFAFA] dark:bg-[#010101] "
      >
        <section
          id="cta"
          className="absolute left-0 w-full 2xl:w-1/2 z-[99] flex flex-col justify-center space-y-8 h-full pl-4 md:pl-8 lg:pl-14 xl:pl-20 2xl:pl-36"
        >
          <p className="w-[350px] md:w-[450px] lg:w-[480px] 2xl:w-[590px] font-bold text-4xl md:text-5xl 2xl:text-6xl">
            Enjoy a brain tease with a Sudoku
          </p>
          <Link
            to="/play"
            className="font-semibold  shadow-lg flex items-center justify-center rounded-lg text-base 2xl:text-lg h-12 w-32 md:w-36 2xl:h-14 2xl:w-44 active:scale-103 transition-all hover:bg-primary hover:text-zinc-50 2xl:dark:hover:bg-primary bg-white text-primary 2xl:dark:text-zinc-50 2xl:dark:bg-primary/90"
          >
            Start a Game
          </Link>
        </section>
        <section
          id="illustartion"
          className="relative w-full md:w-[650px] lg:w-[720px] xl:w-[800px] 2xl:w-[940px] h-full z-40"
        >
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
            id="hero-image"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom right",
              // bottom: ".5px",
            }}
            className="relative z-50 w-full h-full"
          />
        </section>
      </div>
      <div id="hero-bottom" className="flex justify-end w-full h-20 2xl:h-28">
        <div
          className={`w-full md:w-[650px] lg:w-[720px] xl:w-[800px] 2xl:w-[940px] h-full bg-[#F3F3F3] dark:bg-[#010101] ${styles["hero-bottom-rect"]}`}
        ></div>
      </div>
    </Fragment>
  );
};

export default Hero;

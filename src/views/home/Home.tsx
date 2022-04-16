import React from "react";
import { Link } from "react-router-dom";
import Feature from "../../components/home/Feature";
import HeaderLogo from "../../components/common/HeaderLogo";
import Hero from "../../components/home/Hero/Hero";
import Rule from "../../components/home/Rule";
import FirstFeature from "../../components/svgs/FirstFeature";
import LeftSquare from "../../components/svgs/LeftSquare";
import RightSquare from "../../components/svgs/RightSquare";
import SecondFeature from "../../components/svgs/SecondFeature";
import ThirdFeature from "../../components/svgs/ThirdFeature";

import styles from "./Home.module.css";
import ThemeSelector from "../../components/common/ThemeSelector";

const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      id="home-screen"
      className="relative w-full h-full overflow-x-hidden text-darkGrey dark:text-white bg-white dark:bg-darkBg"
    >
      <header className="absolute top-0 flex items-center justify-between h-16 w-full px-4 md:pl-8 lg:pl-14 xl:pl-20 2xl:pl-36 md:pr-14">
        <HeaderLogo />
        <ThemeSelector />
      </header>
      <Hero />
      {/*  */}
      {/*  */}
      <section
        id="features"
        className="w-full mt-16 2xl:mt-28 px-4 sm:px-8 md:px-14 xl:px-20 2xl:px-36 space-y-28"
      >
        <h1 className="text-4xl 2xl:text-[55px] font-bold text-center mb-16 2xl:mb-0 space-y-10 2xl:space-y-0">
          What You Get
        </h1>

        <Feature
          title="Infinite Playability"
          text="An infinite amount of possible Sudoku grids that makes you never
              run out of fun."
          illustration={
            <FirstFeature className="w-80 h-80 lg:w-96 lg:h-96 2xl:w-[537px] 2xl:h-[520px]" />
          }
        />
        <Feature
          title="Variety of Helpers"
          text="You can either play the classic way, or help yourself with features such as automatic cell notes, errors detector and a variety of shortcuts."
          reverse
          illustration={
            <SecondFeature className="w-[340px] h-[340px] md:w-[360px] md:h-[360px] lg:w-[450px] lg:h-[450px] 2xl:w-[580px] 2xl:h-[580px]" />
          }
        />
        <Feature
          title="Go easy on your eyes"
          text="Activate dark mode and take good care of your eyes when playing at night or even
          at daytime, why not?"
          illustration={<ThirdFeature />}
        />
      </section>
      {/*  */}
      {/*  */}
      <section
        id="start-game"
        className="relative flex flex-col items-center justify-center h-[619px] w-full my-20 xl:my-44 2xl:my-52"
      >
        <h2 className="text-4xl 2xl:text-7xl font-bold mb-16 relative z-10">
          Wait no longer
        </h2>
        <Link
          to="play"
          className="flex justify-center items-center w-60 h-16 2xl:w-72 2xl:h-20 font-semibold text-2xl 2xl:text-3xl border-4 border-primary dark:border-white 2xl:dark:border-primary rounded-2xl hover:bg-primary hover:text-white transition-all focus:bg-primary/80 active:scale-103 relative z-10 bg-white dark:bg-darkBg shadow-xl xl:shadow-none"
        >
          Start a Game
        </Link>

        <LeftSquare className="w-[149px] h-[140px] 2xl:w-[284px] 2xl:h-[324px] absolute top-0 left-0" />
        <RightSquare className="absolute w-[293px] h-[360px] right-0 bottom-0" />
      </section>
      {/*  */}
      {/*  */}
      <section
        id="how-to-play"
        className="px-4 md:px-8 lg:px-14 xl:px-20 2xl:px-36"
      >
        <h2 className="font-bold text-4xl 2xl:text-[55px] text-[#686868] dark:text-white">
          Quick how to play
        </h2>
        <p className="text-[#D2D2D2] dark:text-[#8A8A8A] text-2xl 2xl:text-3xl font-medium mt-5">
          3 Simple rules
        </p>

        <div
          id="rules"
          className="flex flex-col md:flex-row 2xl:justify-between w-full my-14 2xl:my-[108px] space-y-10 md:space-y-0 md:space-x-4"
        >
          <Rule
            number={1}
            text="Each row column and 3x3 square must contain the numbers 1 through
            9."
          />
          <Rule
            number={2}
            text="Each row, column, and 3x3 square must not contain duplicate
            numbers. Every number can only appear once in them."
          />
          <Rule
            number={3}
            text="The whole grid must be filled in order to win the game."
          />
        </div>
      </section>
      {/*  */}
      {/*  */}
      <section id="play" className="flex flex-col items-center my-12">
        <p className="text-5xl md:text-6xl 2xl:text-[78px] text-[#C5C5C5]">
          Easy, right?
        </p>
        <div className="relative flex items-center justify-center h-[480px] w-full sm:w-[600px] 2xl:w-[900px] mt-20">
          <Link
            to="/play"
            className="relative z-50 font-bold text-[120px] xl:text-[144px] hover:bg-gradient-to-br hover:from-primary hover:to-primary/50 dark:hover:to-primaryLight hover:bg-clip-text hover:text-transparent transition-all active:scale-103"
          >
            Play
          </Link>

          {/* ILLUSTRATIONS */}

          <div
            className={`absolute w-16 h-16 2xl:w-24 2xl:h-24 bg-primary right-14 top-8 ${styles["animate-square-one"]}`}
          ></div>
          <div
            className={`absolute w-7 h-7 bg-[#8A8A8A] left-28 top-0 ${styles["animate-square-four"]}`}
          ></div>
          <div
            className={`absolute w-20 h-20 2xl:w-28 2xl:h-28 bg-primaryLight dark:bg-[#80E4C1] left-5 2xl:left-0 bottom-16 ${styles["animate-square-two"]}`}
          ></div>
          <div
            className={`absolute w-40 h-40  2xl:w-60 2xl:h-60 bg-[#F8F8F8] dark:bg-[#242424] right-2 -bottom-28 ${styles["animate-square-three"]}`}
          ></div>
        </div>
      </section>

      <footer className="flex flex-col 2xl:flex-row items-center mt-80 py-5 2xl:py-0 2xl:h-11 border-t-2 border-[#EEEEEE] dark:border-opacity-10 mx-4 md:mx-8 lg:md-14 xl:mx-20  2xl:mx-36">
        <p
          id="footer-copyright"
          className="font-medium text-lg text-[#cdcdcd] dark:text-[#4B4B4B]"
        >
          <span className="text-xl">&copy;</span> {currentYear} MEDCHEK
        </p>
        <span className="hidden 2xl:inline-block h-3/5 border-r-2 mx-5 opacity-80 dark:opacity-10"></span>

        <div
          id="footer-links"
          className="h-full flex items-center text-xl xl:text-lg  text-darkGrey/80 dark:text-primary space-x-4"
        >
          <Link to="/play" className="hover:underline underline-offset-4">
            Play
          </Link>
          <a
            href="https://github.com/medchek/react-sudoku"
            className="hover:underline underline-offset-4"
          >
            Github
          </a>
          <a
            href="https://github.com/medchek/"
            className="hover:underline underline-offset-4"
          >
            More projects
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;

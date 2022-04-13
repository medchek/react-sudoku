import React from "react";
import { Link } from "react-router-dom";
import Feature from "../components/home//Feature";
import HeaderLogo from "../components/common/HeaderLogo";
import Hero from "../components/home/Hero/Hero";
import Rule from "../components/home/Rule";
import FirstFeature from "../components/svgs/FirstFeature";
import LeftSquare from "../components/svgs/LeftSquare";
import RightSquare from "../components/svgs/RightSquare";
import SecondFeature from "../components/svgs/SecondFeature";
import ThirdFeature from "../components/svgs/ThirdFeature";

const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative w-full h-full overflow-x-hidden text-darkGrey dark:text-white bg-white dark:bg-darkBg">
      <header className="absolute top-0 flex items-center h-16 w-full px-36">
        <HeaderLogo />
      </header>
      <Hero />
      {/*  */}
      {/*  */}
      <section id="features" className="w-full px-36 mt-28">
        <h1 className="text-[55px] font-bold text-center">What You Get</h1>

        <Feature
          title="Infinite Playability"
          text="An infinite amount of possible Sudoku grids that makes you never
              run out of fun."
          illustration={<FirstFeature className="w-[537px] h-[520px]" />}
        />
        <Feature
          title="Variety of Helpers"
          text="You can either play the classic way, or help yourself with features such as automatic cell notes, errors detector and more."
          reverse
          illustration={<SecondFeature className="w-[580px] h-[580px]" />}
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
        className="relative flex flex-col items-center justify-center h-[619px] w-full my-52"
      >
        <h2 className="text-7xl font-bold mb-16">Wait no longer</h2>
        <Link
          to="play"
          className="flex justify-center items-center w-72 h-20 font-semibold text-3xl border-4 border-primary rounded-2xl hover:bg-primary hover:text-white transition-all focus:bg-primary/80 focus:scale-103"
        >
          Start a Game
        </Link>

        <RightSquare className="absolute w-[293px] h-[360px] right-0 bottom-0" />
        <LeftSquare className="w-[284px] h-[324px] absolute top-0 left-0" />
      </section>
      {/*  */}
      {/*  */}
      <section id="how-to-play" className="px-36">
        <h2 className="font-bold text-[55px] text-[#686868] dark:text-white">
          Quick how to play
        </h2>
        <p className="text-[#D2D2D2] dark:text-[#8A8A8A] text-3xl font-medium">
          3 Simple rules
        </p>

        <div id="rules" className="flex justify-between w-full my-[108px]">
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
        <p className="text-[78px] text-[#C5C5C5]">Easy, right?</p>
        <div className="relative flex items-center justify-center h-[480px] w-[900px] mt-20">
          <Link
            to="/play"
            className="font-bold text-[144px] hover:bg-gradient-to-br hover:from-primary hover:to-darkGrey dark:hover:to-primaryLight hover:bg-clip-text hover:text-transparent transition-all focus:scale-103"
          >
            Play
          </Link>

          {/* ILLUSTRATIONS */}

          <div className="absolute w-24 h-24 bg-primary right-14 top-8"></div>
          <div className="absolute w-7 h-7 bg-[#8A8A8A] left-28 top-0"></div>
          <div className="absolute w-28 h-28 bg-primaryLight dark:bg-[#80E4C1] left-0 translate-y-28"></div>
          <div className="absolute w-60 h-60 bg-[#F8F8F8] dark:bg-[#242424] right-0 -bottom-28"></div>
        </div>
      </section>

      <footer className="flex items-center mt-80 h-11 border-t-2 border-[#EEEEEE] dark:border-opacity-10 mx-36">
        <p
          id="footer-copyright"
          className="font-medium text-lg text-[#cdcdcd] dark:text-[#4B4B4B]"
        >
          <span className="text-xl">&copy;</span> {currentYear} MEDCHEK
        </p>
        <span className="h-3/5 border-r-2 mx-5 opacity-80 dark:opacity-10"></span>

        <div
          id="footer-links"
          className="h-full flex items-center text-lg text-primary space-x-4"
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

import React, { ReactNode } from "react";

interface Props {
  text: string;
  title: string;
  illustration: ReactNode;
  reverse?: boolean;
}

const Feature = ({ text, title, reverse, illustration }: Props) => {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center 2xl:h-[650px] w-full mb-16 sm:mb-0 space-y-10 md:space-y-0 text-center md:text-left`}
    >
      {/* TEXT */}
      <section className="flex flex-col justify-center items-center md:items-start w-full 2xl:w-1/2 h-full ">
        <div className="flex flex-col 2xl:w-[700px] space-y-2">
          <h2 className="text-3xl md:text-2xl lg:text-3xl 2xl:text-4xl font-medium text-primary">
            {title}
          </h2>
          <p className="text-xl md:text-xl lg:text-2xl 2xl:text-[29px] font-light">
            {text}
          </p>
        </div>
      </section>
      {/* ILLUSTRATION */}
      <section
        className={`flex items-center justify-center w-full 2xl:w-1/2 h-full  ${
          reverse ? " md:justify-start" : "md:justify-end"
        }`}
      >
        {illustration}
      </section>
    </div>
  );
};

export default Feature;

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
      className={`flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } h-[650px] w-full`}
    >
      <section
        className={`flex flex-col justify-center w-1/2 h-full ${
          reverse ? "items-end" : "items-start"
        }`}
      >
        <div className="w-[700px] space-y-2">
          <h2 className="text-4xl font-medium text-primary">{title}</h2>
          <p className="text-[29px] font-light">{text}</p>
        </div>
      </section>
      <section
        className={`flex items-center w-1/2 h-full ${
          reverse ? "justify-start" : "justify-end"
        }`}
      >
        {illustration}
      </section>
    </div>
  );
};

export default Feature;

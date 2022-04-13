import React from "react";

interface Props {
  number: number;
  text: string;
}

const Rule = ({ number, text }: Props) => {
  return (
    <section className="flex w-[350px] space-x-4">
      <p className="text-[45px] font-semibold text-primary">{number}</p>
      <p className="font-thin text-[26px]">{text}</p>
    </section>
  );
};

export default Rule;

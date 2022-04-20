import React from "react";

interface Props {
  name: string;
  shortcuts: string[];
}

const DisplayKeybind = ({ name, shortcuts }: Props) => {
  const displayShortcuts = (): JSX.Element => {
    return (
      <div className="w-1/2 space-y-1">
        {shortcuts.map((shortcut, i) => (
          <p
            key={i}
            className="border-l-2 hover:border-primary dark:text-zinc-50 pl-2 uppercase font-semibold cursor-default"
          >
            {shortcut}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="flex justify-between w-full  min-h-[3.5rem] items-center hover:bg-zinc-50 dark:hover:bg-zinc-700/50 py-2">
      <p className=" text-zinc-800 dark:text-zinc-300 w-1/2">{name}</p>
      {displayShortcuts()}
    </div>
  );
};

export default DisplayKeybind;

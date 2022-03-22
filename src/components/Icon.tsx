import React from "react";

interface Props {
  icon: string;
  className: string;
}

const Icon = ({ icon, className }: Props) => {
  return (
    <svg viewBox="0 0 24 24" preserveAspectRatio="none" className={className}>
      <path fill="currentColor" className="fill-current" d={icon} />
    </svg>
  );
};

export default Icon;

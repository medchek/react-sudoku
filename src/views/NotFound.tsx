import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const NotFound = (props: Props) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.state.idx === 0) {
      navigate("/", { replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-white dark:bg-darkBg text-darkGrey dark:text-zinc-50">
      <div className="flex  items-center space-x-4 h-10">
        <p className="text-xl">PAGE NOT FOUND</p>
        <span className="w-0 h-full border-r-2 dark:border-zinc-600"></span>
        <button
          className="hover:underline underline-offset-2"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;

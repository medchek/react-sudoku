import Grid from "../components/Grid";
import Logo from "../components/svgs/Logo";
import Operations from "../components/Operations";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pauseTimer, unpauseTimer } from "../store/slices/timerSlice";
import { useAppSelector } from "../store/storeHooks";
import { RootState } from "../store/store";

const Sudoko = () => {
  const dispatch = useDispatch();
  const diffuculty = useAppSelector(
    (state: RootState) => state.grid.difficulty
  );
  useEffect(() => {
    const onVisibilityChange = () => {
      if (diffuculty === null) return;
      if (document.visibilityState === "hidden") {
        dispatch(pauseTimer());
      } else {
        dispatch(unpauseTimer());
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [dispatch, diffuculty]);

  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-10 lg:px-20 xl:px-40 2xl:px-72 w-full h-full overflow-hidden">
      <header className="w-full h-12 min-h-[3rem] sm:h-14 sm:min-h-[3.5rem] pt-1 md:pt-2">
        <a className="flex items-center space-x-2 xl:space-x-3 w-44" href=".">
          <Logo className="w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10" />
          <span className="font-semibold text-darkGrey text-2xl xl:text-3xl">
            Sudoku
          </span>
        </a>
      </header>
      <main className="flex flex-col justify-between grow">
        <div
          id="grid-display"
          className="grow flex flex-col items-center justify-center"
        >
          <Grid />
        </div>
        <Operations />
      </main>
    </div>
  );
};

export default Sudoko;

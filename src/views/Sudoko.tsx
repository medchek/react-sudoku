import Grid from "../components/sudoku/Grid";
import Operations from "../components/sudoku/Operations";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/storeHooks";
import { RootState } from "../store/store";
import HeaderLogo from "../components/common/HeaderLogo";
import { setTabIsFocused } from "../store/slices/uiSlice";

const Sudoko = () => {
  const dispatch = useDispatch();
  const diffuculty = useAppSelector(
    (state: RootState) => state.grid.difficulty
  );
  useEffect(() => {
    const onVisibilityChange = () => {
      if (diffuculty === null) return;
      if (document.visibilityState === "hidden") {
        dispatch(setTabIsFocused(false));
      } else {
        dispatch(setTabIsFocused(true));
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [dispatch, diffuculty]);

  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-10 lg:px-20 xl:px-40 2xl:px-72 w-full h-full overflow-hidden bg-white dark:bg-darkBg">
      <header className="w-full h-12 min-h-[3rem] sm:h-14 sm:min-h-[3.5rem] pt-1 md:pt-2">
        <HeaderLogo />
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

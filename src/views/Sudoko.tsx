import Grid from "../components/Grid";
import Logo from "../components/svgs/Logo";
import Operations from "../components/Operations";

const Sudoko = () => {
  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-10 lg:px-20 xl:px-40 2xl:px-72 w-full h-full overflow-hidden">
      <header className="w-full h-14 min-h-[3.5rem] pt-3">
        <a className="flex items-center space-x-2 xl:space-x-3 w-44" href=".">
          <Logo className="w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10" />
          <span className="font-semibold text-darkGrey text-2xl xl:text-3xl">
            Sudoku
          </span>
        </a>
      </header>
      {/* mt-14 */}
      <main className="flex flex-col justify-between grow">
        <div
          id="grid-display"
          className="grow flex items-center justify-center"
        >
          <Grid />
        </div>
        <Operations />
      </main>
    </div>
  );
};

export default Sudoko;

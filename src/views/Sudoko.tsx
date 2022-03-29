import Grid from "../components/Grid";
import Logo from "../components/svgs/Logo";
import Operations from "../components/Operations";

const Sudoko = () => {
  return (
    <div className="flex flex-col px-10 lg:px-20 xl:px-40 2xl:px-72 w-full h-full overflow-hidden">
      <header className="w-full h-14 min-h-[3.5rem] pt-3">
        <a className="flex items-center space-x-3 w-44" href=".">
          <Logo className="w-10 h-10" />
          <span className="font-semibold text-darkGrey text-3xl">Sudoku</span>
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

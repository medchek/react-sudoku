import { mdiClose, mdiKeyboardVariant } from "@mdi/js";
import React, { Fragment, Suspense, useEffect, useState } from "react";
import { pauseTimer, unpauseTimer } from "../../store/slices/timerSlice";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import DisplayKeybind from "../common/DisplayKeybind";
import Icon from "../common/Icon";
import Modal from "../common/Modal/Modal";

type Props = {};

const KeybindButton = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDifficultySelected = useAppSelector(
    (state: RootState) => state.grid.difficulty
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    // only pause/unpause timer if the game is ongoin (i.e. difficulty has already been selected)
    if (isDifficultySelected === null) return;
    if (isOpen) {
      dispatch(pauseTimer());
    } else {
      dispatch(unpauseTimer());
    }
  }, [isOpen, isDifficultySelected, dispatch]);

  const handleOnclose = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <button
        className="hidden md:flex items-center justify-center h-7 md:h-8 px-2 bg-slate-100 hover:bg-slate-200 active:ring-2 ring-primary text-zinc-500 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 text-sm rounded md:mt-1 font-medium space-x-1"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-xs lg:text-sm">KEYBINDS</span>
        <Icon
          icon={mdiKeyboardVariant}
          className="hidden lg:inline-block w-5 h-5 md:w-6 md:h-6"
        />
      </button>
      {isOpen && (
        <Suspense fallback={null}>
          <Modal
            closeModal={handleOnclose}
            closeOnClickOutside
            noButtons
            customSize
            className="w-[95%] sm:w-3/4 xl:w-4/6 2xl:w-1/2 h-4/5 px-4 py-2"
          >
            <div className="flex items-center justify-between py-2 text-darkGrey dark:text-zinc-100 text-2xl font-medium">
              <p>KEYBINDS</p>
              <button
                className="flex items-center justify-center bg-zinc-50 dark:bg-zinc-700/50 active:bg-zinc-100 active:dark:bg-zinc-700 rounded w-8 h-8"
                title="close - ESC"
                onClick={handleOnclose}
              >
                <Icon icon={mdiClose} className="w-6 h-6" />
              </button>
            </div>

            <section className="border-t dark:border-zinc-600 mt-1 space-y-5 py-2 overflow-y-auto">
              <DisplayKeybind
                name="Navigate the grid"
                shortcuts={["Arrow Keys"]}
              />
              <DisplayKeybind
                name="Undo"
                shortcuts={["CTRL + Z", "Alt + backspace"]}
              />
              <DisplayKeybind
                name="Set cell number"
                shortcuts={["Numeric keys", "Numpad Keys"]}
              />
              <DisplayKeybind
                name="Insert note"
                shortcuts={["Shift + Number (numpad or numeric keys)"]}
              />
              <DisplayKeybind
                name="Reset cell number/user Notes"
                shortcuts={[
                  "delete",
                  "backspace",
                  "0 (numpad and numeric key)",
                  "middle mouse button",
                ]}
              />
              <DisplayKeybind name="Toggle Auto Notes" shortcuts={["A", "Q"]} />
              <DisplayKeybind name="Toggle Note Mode" shortcuts={["N"]} />
              <DisplayKeybind name="Pause the gme" shortcuts={["P"]} />
              <DisplayKeybind name="Reveal hint" shortcuts={["H"]} />
              <DisplayKeybind name="Close" shortcuts={["Escape"]} />
            </section>
          </Modal>
        </Suspense>
      )}
    </Fragment>
  );
};

export default KeybindButton;

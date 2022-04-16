import React, { KeyboardEvent, ReactNode, useEffect, useRef } from "react";
import { Portal } from "react-portal";
import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/storeHooks";

import styles from "./Modal.module.css";

type Props = {
  children: ReactNode;
  closeModal: () => void;
  closeOnClickOutside?: boolean;
  onConfirm?: () => void;
  title?: string;
  noButtons?: boolean;
  customSize?: boolean;
  className?: string;
  noEscape?: boolean;
};

const Modal = ({
  children,
  closeModal,
  closeOnClickOutside,
  onConfirm,
  title,
  noButtons,
  customSize,
  className,
  noEscape,
}: Props) => {
  const isDarkMode = useAppSelector((state: RootState) => state.ui.isDarkMode);

  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handleOnClickOutside = () => {
    if (closeOnClickOutside) {
      closeModal();
    }
  };

  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && !noEscape) {
      closeModal();
    }
  };

  return (
    <Portal>
      <div
        ref={modalRef}
        id="modal"
        role="dialog"
        className={`absolute top-0 flex items-center justify-center min-h-screen min-w-full w-screen h-screen overflow-hidden ${
          isDarkMode ? "dark" : ""
        }`}
        tabIndex={0}
        onKeyDown={handleOnKeyDown}
      >
        <div
          id="modal-overlay"
          onClick={handleOnClickOutside}
          className={`absolute top-0 w-full h-full bg-slate-800/50 dark:bg-stone-900/90 z-[100] ${styles["animate-fade"]}`}
        ></div>

        <div
          className={`${
            !customSize
              ? "w-11/12 md:w-4/6 lg:w-1/2 2xl:w-1/3 min-h-[5rem] px-4 pt-2"
              : className
          } ${
            styles["animate-scale"]
          } bg-white dark:bg-zinc-800 rounded-lg shadow-xl text-darkGrey flex flex-col justify-between  absolute z-[100]`}
        >
          {title && title.length > 0 && (
            <p className="text-xl font-semibold dark:text-zinc-100">{title}</p>
          )}
          <div className={`grow ${!customSize ? "py-4" : ""}`}>{children}</div>

          {!noButtons && (
            <div className="h-auto w-full flex justify-end space-x-2 border-t dark:border-zinc-600 py-2">
              <button
                onClick={onConfirm}
                type="button"
                className="flex items-center justify-center w-20 h-10 bg-primary/70 text-white hover:bg-primary focus:bg-emerald-400 font-medium rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                type="button"
                className="flex items-center justify-center w-20 h-10 bg-slate-100 dark:bg-zinc-700 text-slate-400 hover:text-slate-500 hover:dark:text-slate-200 font-medium rounded-md"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;

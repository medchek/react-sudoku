import React, { KeyboardEvent, ReactNode, useEffect, useRef } from "react";
import { Portal } from "react-portal";

type Props = {
  children: ReactNode;
  closeModal: () => void;
  closeOnClickOutside?: boolean;
  onConfirm: () => void;
  title?: string;
};

const Modal = ({
  children,
  closeModal,
  closeOnClickOutside,
  onConfirm,
  title,
}: Props) => {
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
    console.log(e.key);
    if (e.key === "Escape") {
      closeModal();
    }
  };

  return (
    <Portal>
      <div
        ref={modalRef}
        id="modal"
        role="dialog"
        className="absolute top-0 flex items-center justify-center min-h-screen min-w-full w-screen h-screen overflow-hidden"
        tabIndex={0}
        onKeyDown={handleOnKeyDown}
      >
        <div
          id="modal-overlay"
          onClick={handleOnClickOutside}
          className="absolute top-0 w-full h-full bg-slate-800/50"
        ></div>

        <div className="w-1/3 min-h-[5rem] bg-white rounded-lg shadow-xl text-darkGrey flex flex-col justify-between px-4 pt-2 absolute z-[100]">
          {title && title.length > 0 && (
            <p className="text-xl font-semibold">{title}</p>
          )}
          <div className="grow py-4">{children}</div>
          <div className="h-auto w-full flex justify-end space-x-2 border-t py-2">
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
              className="flex items-center justify-center w-20 h-10 bg-slate-100 text-slate-400 hover:text-slate-500 font-medium rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;

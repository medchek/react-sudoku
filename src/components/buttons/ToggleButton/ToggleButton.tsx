import React, { Fragment, useState } from "react";
import { RootState } from "../../../store/store";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import BaseButton from "../BaseButton";
import Modal from "../../common/Modal/Modal";
import styles from "./ToggleButton.module.css";
import {
  setAutoNotes,
  setNoteMode,
  toggleNoteMode,
} from "../../../store/slices/gridSlice";

interface Props {
  text: string;
  disabled: boolean;
}

const ToggleButton = ({ text, disabled }: Props) => {
  const dispatch = useAppDispatch();
  const isAutoNotes = useAppSelector(
    (state: RootState) => state.grid.autoNotes
  );
  const isNoteMode = useAppSelector((state: RootState) => state.grid.noteMode);

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  const handleOnClick = () => {
    if (disabled) return;
    // if the autonote is on, ask  the user to confirm that the auto note will be disabled if the note mode is active
    if (isAutoNotes === true) {
      setShowModal(!showModal);
    } else {
      dispatch(toggleNoteMode());
    }
  };
  /**
   * Disables AutoNotes and activate note mode, then closes the modal
   */
  const handleOnModalConfirm = () => {
    dispatch(setAutoNotes(false));
    dispatch(setNoteMode(true));
    setShowModal(false);
  };

  return (
    <Fragment>
      <BaseButton
        className={`${
          isNoteMode
            ? "bg-white text-primary ring-2 ring-primary/70"
            : "text-[#9C9C9C] hover:ring-2"
        } font-bold text-xs sm:text-sm hover:ring-primary/70 transition-colors`}
        customColors
        disable={disabled}
        onClick={handleOnClick}
      >
        {text}
        {isNoteMode && (
          <span
            className={`absolute h-4 w-4 sm:w-5 sm:h-5 bg-primary rounded-full shadow-md -top-2 -right-2 ${styles["animate-scale"]}`}
          ></span>
        )}
      </BaseButton>
      {showModal && (
        <Modal
          closeModal={closeModal}
          onConfirm={handleOnModalConfirm}
          closeOnClickOutside
          title="Note Mode"
        >
          <p className="text-zinc-700">
            Activating Note Mode will disable Auto Notes.
          </p>
        </Modal>
      )}
    </Fragment>
  );
};

export default ToggleButton;

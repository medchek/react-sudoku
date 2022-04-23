import React, { Fragment, useState } from "react";
import SwitchableOption from "./SwitchableOption";
import {
  setAutoNotes,
  setNoteMode,
  toggleAutoNotes as toggleStoreAutoNotes,
} from "../../store/slices/gridSlice";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import { RootState } from "../../store/store";
import Modal from "../common/Modal/Modal";
type Props = {};

const AutoNotesSwitch = (props: Props) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  const isAutoNotesOn = useAppSelector(
    (state: RootState) => state.grid.autoNotes
  );
  const isNoteModeOn = useAppSelector(
    (state: RootState) => state.grid.noteMode
  );

  const toggleAutoNotes = () => {
    if (isNoteModeOn) {
      // if note mode is on, show the confirmation modal
      setShowModal(true);
    } else {
      dispatch(toggleStoreAutoNotes());
    }
  };

  const handleOnModalConfirm = () => {
    dispatch(setNoteMode(false));
    dispatch(setAutoNotes(true));
    closeModal();
  };

  return (
    <Fragment>
      <SwitchableOption
        text="Auto Notes"
        isOn={isAutoNotesOn}
        onClick={toggleAutoNotes}
        tooltip="Automatically sets the notes of all the empty cells and keeps updating them"
      />
      {showModal && (
        <Modal
          closeModal={closeModal}
          onConfirm={handleOnModalConfirm}
          closeOnClickOutside
          title="Auto Notes"
        >
          <p className="text-zinc-700 dark:text-zinc-100">
            Activating auto notes will disable{" "}
            <span className="font-medium">Note Mode</span> and remove all your
            manually set notes.
          </p>
        </Modal>
      )}
    </Fragment>
  );
};

export default AutoNotesSwitch;

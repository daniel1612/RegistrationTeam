import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ModalConfirmProps {
  cost: number;
  onChange: (value: boolean) => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ cost, onChange }) => {
  const formContext = useFormContext();
  const { reset } = formContext;
  const { getValues } = useFormContext();
  const formData = getValues();

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(true);

  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
    onChange(false);

    reset({
      selectedEmployee: "",
      spouseJoining: false,
      numberOfChildren: 0,
      numberOfAdultsChildren: 0,
      shabbatObservance: false,
      numberOfRooms: 0,
      numberOfPersons: 0,
      connectingDoor: false,
      transportation: "",
      numberOfPlaces: 0,
      basketballTournament: false,
    });
  };

  const handleConfirmation = async () => {
    try {
      closeConfirmationModal();
      onChange(false);
    } catch (error) {
      console.error("Error during form reset:", error);
      toast.error("Error during form reset");
    }
  };

  return (
    <Modal
      isOpen={isConfirmationModalOpen}
      onRequestClose={closeConfirmationModal}
      contentLabel="Confirmation Modal"
      className="modalbg-gray-800 p-4 rounded-md backdrop-filter backdrop-blur-md "
      overlayClassName="overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div>
        <p className="mb-8 text-lg font-bold " >
          Hello {formData.selectedEmployee} - Are you sure you want to submit
          the form?
        </p>
        <div className="mb-8">
          <p>Number of Adults: {formData.spouseJoining ? 2 : 1}</p>
          <p>Number of Childrens: {formData.numberOfChildren}</p>
          <p>Number of Rooms: {formData.numberOfRooms}</p>
          <p>Total People: {formData.numberOfPersons}</p>
          {formData.shabbatObservance && <p>Shabbat Observance : Yes</p>}
          {formData.connectingDoor && <p>Connecting Door : Yes</p>}
          {formData.numberOfPlaces > 0 && <p> Number of Places for Transportation</p>}
          {formData.basketballTournament && <p>You signed up for the basketball tournament!</p>}
        </div>

        <p className="mb-8 text-lg">Cost of team evening: {cost}</p>

        <button
          className="bg-blue-500 text-white p-2 rounded-md mr-2"
          onClick={handleConfirmation}
        >
          Yes, submit
        </button>
        <button
          className="bg-gray-300 text-gray-700 p-2 rounded-md"
          onClick={closeConfirmationModal}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ModalConfirm;

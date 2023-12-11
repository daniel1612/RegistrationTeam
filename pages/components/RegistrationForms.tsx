import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import EmployeeSelected from "./UI/EmployeeSelected";
import CheckboxInput from "./UI/CheckboxInput";
import { FormValues } from "./types/types";
import RoomSelector from "./UI/RoomSelected";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalConfirm from "./UI/ModalConfirm";
import TransportationSelected from "./UI/TransportationSelected";
import NumberInput from "./UI/NumberInput";

const RegistrationForm: React.FC = () => {
  const methods = useForm<FormValues>();

  // const methods = useForm<FormValues>({
  //   defaultValues: {
  //     selectedEmployee: "",
  //     spouseJoining: false,
  //     numberOfChildren: 0,
  //     numberOfAdultsChildren: 0,
  //     shabbatObservance: false,
  //     numberOfRooms: 0,
  //     numberOfPersons: 0,
  //     connectingDoor: false,
  //     transportation: "",
  //     numberOfPlaces: 0,
  //     basketballTournament: false,
  //   },
  // });
  const [showBasketballToast, setShowBasketballToast] =
    useState<boolean>(false);
  const [cost, setCost] = useState<number>(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const onSubmit = async (data: FormValues) => {
    try {
      setShowBasketballToast(false);
      const response = await axios.post("/api/webhooks/route", data);

      if (response.status === 200 && response.data.success) {
        toast.success("Form submitted successfully!");
        setCost(response.data.data.totalPrice);
        setIsFormSubmitted(true);
      } else if (response.data.error) {
        toast.error(`Validation failed: ${response.data.error}`);
      }
    } catch (error: any) {
      console.error("Error sending form data:", error);
      toast.error("Error sending form data");
    }
  };

  if (showBasketballToast) {
    toast.info("You are eligible for the basketball tournament!", {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  const handleEmployeeChange = () => {
    setShowBasketballToast(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-gray-800 rounded shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4 text-blue-500">
        Team Evening Registration Form
      </h2>
      <FormProvider {...methods}>
        <form
          className="max-w-md mx-auto bg-gray-800 p-8 border shadow-md rounded-lg"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <EmployeeSelected onChange={handleEmployeeChange} />

          <CheckboxInput name="spouseJoining" label="Spouse Joining" />
          <NumberInput
            name="numberOfChildren"
            label="Number of Children Joining"
            min={0}
          />
          <NumberInput
            name="numberOfAdultsChildren"
            label="Number of Adults Children Joining"
            min={0}
          />

          <NumberInput
            name="numberOfPersons"
            label="Number of Persons Arriving"
            min={1}
            max={10}
            onChange={(value) => setShowBasketballToast(value >= 5)}
          />
          <CheckboxInput name="shabbatObservance" label="Shabbat Observance" />
          <RoomSelector name="numberOfRooms" label="Number of Rooms" />

          <CheckboxInput name="connectingDoor" label="Connecting Door" />
          <TransportationSelected
            name="numberOfPlaces"
            label="Number of Places for Transportation"
          />

          {showBasketballToast && (
            <div>
              <CheckboxInput
                name="basketballTournament"
                label="Basketball Tournament"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
            >
            Submit
          </button>
        </form>
        {isFormSubmitted && (
          <ModalConfirm cost={cost} onChange={setIsFormSubmitted} />
        )}
      </FormProvider>
    </div>
  );
};

export default RegistrationForm;

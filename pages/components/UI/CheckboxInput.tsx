import React from "react";
import { useFormContext } from "react-hook-form";

interface CheckboxInputProps {
  name: string;
  label: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ name, label }) => {
  const { register } = useFormContext();

  return (
    <label className="block mb-4">
      {label}:
      <input
        className="form-checkbox ml-2"
        type="checkbox"
        {...register(name)}
      />
    </label>
  );
};

export default CheckboxInput;

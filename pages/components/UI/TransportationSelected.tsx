import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface TransportationSelectProps {
  name: string;
  label: string;
}

const TransportationSelected: React.FC<TransportationSelectProps> = ({
  name,
  label,
}) => {
  const { register, setValue, watch } = useFormContext();
  const numberOfPersons = watch("numberOfPersons") || 1;

  const [numberPlaces, setNumberPlaces] = useState<number[]>([]);

  useEffect(() => {
    const options: number[] = [];

    for (let i = 0; i <= numberOfPersons; i++) {
      options.push(i);
    }

    setNumberPlaces(options);
    setValue(name, options[0]);
  }, [numberOfPersons, setValue, name]);

  return (
    <label className="block mb-4">
      {label}:
      <select
        className="mt-1 p-2 border w-full rounded-md bg-gray-800"
        {...register(name)}
        onChange={(e) => setValue(name, parseInt(e.target.value, 10))}
      >
        {numberPlaces.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default TransportationSelected;

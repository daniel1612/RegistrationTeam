import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface RoomSelectorProps {
  name: string;
  label: string;
  defaultRooms?: number; 
}

const RoomSelector: React.FC<RoomSelectorProps> = ({ name, label, defaultRooms = 1 }) => {
  const { register, setValue, watch } = useFormContext(); 
  const numberOfPersons = watch('numberOfPersons'); 

  const [roomOptions, setRoomOptions] = useState<number[]>([]);

  useEffect(() => {
    const options: number[] = [];
    const totalRooms = Math.ceil((numberOfPersons || defaultRooms) / 2);
    
    for (let i = totalRooms; i <= 5; i++) {
      options.push(i);
    }

    setRoomOptions(options);
    setValue(name, options[0]);
  }, [numberOfPersons, setValue, name, defaultRooms]);

  return (
    <label className="block mb-4">
      {label}:
      <select
        className="mt-1 p-2 border w-full rounded-md bg-gray-800"
        {...register(name)}
        onChange={(e) => setValue(name, parseInt(e.target.value, 10))}
      >
        {roomOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default RoomSelector;

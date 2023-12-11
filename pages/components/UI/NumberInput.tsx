import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface NumberInputProps {
  name: string;
  label: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange?: (value: number) => void; 
}

const NumberInput: React.FC<NumberInputProps> = ({
  name,
  label,
  min = 0,
  max,
  disabled,
  onChange,
}) => {
  const { register, setValue } = useFormContext();
  const [error, setError] = useState<string | undefined>(undefined);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;    

    if (value < min) {
      setError(`Value must be greater than or equal to ${min}`);
    } else if (max !== undefined && value > max) {
      setError(`Value must be less than or equal to ${max}`);
    } else {
      setError(undefined);
    }

    setValue(name, value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="block mb-4 ">
      <label>
        {label}:
        <input
          type="number"
          className={`mt-1 p-2 border w-full rounded-md bg-gray-800 ${
            error ? 'border-red-400' : ''
          }`}
          // {...register(name, { min, max })}
          {...register(name, { valueAsNumber: true, min, max })}
          disabled={disabled}
          onChange={handleInputChange}
        />
      </label>
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default NumberInput;

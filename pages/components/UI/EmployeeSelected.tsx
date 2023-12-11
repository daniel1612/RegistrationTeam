import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { dummyEmployees } from "../../mock/employees";

interface EmployeeProps {
  onChange: () => void;
}

const EmployeeSelected: React.FC<EmployeeProps> = ({ onChange }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors.selectedEmployee?.message;

  useEffect(() => {
    if (error) {
      onChange();
    }
  }, [error, onChange]);

  return (
    <label className="block mb-4">
      Select Employee:
      <select
        className="mt-1 p-2 border w-full rounded-md bg-gray-800"
        {...register("selectedEmployee", {
          required: "Please select an employee.",
        })}
      >
        <option value="">Select an Employee</option>
        {dummyEmployees.map((employee) => (
          <option key={employee.id} value={employee.name}>
            {employee.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400">Please select an employee. </p>}
    </label>
  );
};

export default EmployeeSelected;

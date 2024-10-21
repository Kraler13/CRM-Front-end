import { ChangeEvent } from "react";

export interface SelectProps {
  values: [string, string][];
  selectedValue: string; 
  onValuesChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
}

const Select = ({ values, selectedValue, onValuesChange, ...rest }: SelectProps): JSX.Element => {
  return (
    <select value={selectedValue} onChange={onValuesChange} {...rest}>
      {values.map(([value, text]) => (
        <option key={value} value={value} selected={selectedValue === value} >
          {text}
        </option>
      ))}
    </select>
  );
};

export default Select;
import { ChangeEvent } from "react";

export interface SelectProps {
  values: [string, string][]; // Tablica z parami [key, val]
  selectedValue: string; // Przechowujemy string zamiast obiektu
  onValuesChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
}

const Select = ({ values, selectedValue, onValuesChange, ...rest }: SelectProps): JSX.Element => {
  return (
    <select value={selectedValue} onChange={onValuesChange} {...rest}>
      {values.map(([value, text]) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
};

export default Select;
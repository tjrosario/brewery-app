import React, { useCallback, ChangeEvent } from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  items: Array<string|number>; // expand this to accept objects
  defaultValue: string|number;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.SFC<SelectFieldProps> = ({ name, label, items, defaultValue, handleChange }): JSX.Element => {
  return (
    <div className="form-group ">
      <label htmlFor={name} className="mr-2 w-100">{label}:</label>
      <select className="form-control" id={name} name={name} defaultValue={defaultValue} onChange={handleChange}>
        {items.map(item =>
          <option value={item} key={item}>{item}</option>
        )}
      </select>
    </div>
  )
};

export default React.memo(SelectField);
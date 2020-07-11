import React, { useCallback } from "react";

interface SelectFieldProps {
  label: string;
  items: Array<string|number>; // expand this to accept objects
  defaultValue: string|number;
  handleChange: (value: string) => void;
}

const SelectField: React.SFC<SelectFieldProps> = ({ label, items, defaultValue, handleChange }): JSX.Element => {
  console.log('render SelectField', label);

  return (
    <div className="form-group d-flex align-items-baseline col-3">
      <label htmlFor="types" className="mr-2 w-100">{label}:</label>
      <select className="form-control" id="types" defaultValue={defaultValue} onChange={ev => handleChange(ev.target.value)}>
        {items.map(item =>
          <option value={item} key={item}>{item}</option>
        )}
      </select>
    </div>
  )
};

export default React.memo(SelectField);
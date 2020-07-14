import React, { ChangeEvent } from "react";

interface TextFieldProps {
  defaultValue: string|number;
  placeholder: string;
  label?: string;
  name: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.SFC<TextFieldProps> = ({ name, label, placeholder, defaultValue, handleChange }): JSX.Element => {
  return (
    <div className="form-group">
      {label ? <label htmlFor={name} className="mr-2 w-100">{label}:</label> : null}
      <input type="text" className="form-control" defaultValue={defaultValue} placeholder={placeholder} onChange={handleChange} name={name} id={name}  />
    </div>
  )
};

export default React.memo(TextField);
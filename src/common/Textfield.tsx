import React, { ChangeEvent } from "react";

interface TextFieldProps {
  value: string|number;
  placeholder: string;
  label?: string;
  name: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.SFC<TextFieldProps> = ({ name, label, placeholder, value, handleChange }): JSX.Element => {
  return (
    <div className="form-group">
      {label ? <label htmlFor={name} className="mr-2 w-100">{label}:</label> : null}
      <input type="text" className="form-control" value={value} placeholder={placeholder} onChange={handleChange} name={name} id={name}  />
    </div>
  )
};

export default React.memo(TextField);
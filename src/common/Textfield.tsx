import React, { ChangeEvent } from "react";

interface TextFieldProps {
  defaultValue: string;
  placeholder: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.SFC<TextFieldProps> = ({ placeholder, defaultValue, handleChange }): JSX.Element => {
  return (
    <div className="form-group d-flex align-items-baseline col-3">
      <input type="text" className="form-control" defaultValue={defaultValue} placeholder={placeholder} onChange={handleChange}  />
    </div>
  )
};

export default React.memo(TextField);
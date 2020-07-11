import React from "react";

interface TextFieldProps {
  defaultValue: string;
  handleChange: (value: string) => void;
  placeholder: string;
}

const TextField: React.SFC<TextFieldProps> = ({ placeholder, defaultValue, handleChange }): JSX.Element => {
  return (
    <div className="form-group d-flex align-items-baseline col-3">
      <input type="text" className="form-control" placeholder={placeholder} onChange={e => handleChange(e.target.value)} defaultValue={defaultValue} />
    </div>
  )
};

export default React.memo(TextField);
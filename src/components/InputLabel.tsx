import { JSX } from "react";
import Input from "./Input";
interface InputLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
  errorMessage?: string;
}

const InputLabel = ({
  id,
  name,
  label = "",
  type = "text",
  containerClassName = "form__group",
  value = "",
  required = false,
  errorMessage = "",
  ...inputProps
}: InputLabelProps): JSX.Element => {
  return (
    <div className={containerClassName}>
      <label className='form__label' htmlFor={name}>
        {label}
        {required && <span className='form__required'> *</span>}
      </label>
      <Input id={id} name={name} value={value} type={type} {...inputProps} />
      {errorMessage && <div className='form__error'>{errorMessage}</div>}
    </div>
  );
};

export default InputLabel;

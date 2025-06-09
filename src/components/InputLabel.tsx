import { JSX } from "react";
import Input from "./Input";
interface InputLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
  hasError?: string;
}

const InputLabel = ({
  id,
  name,
  label = "",
  type = "text",
  containerClassName = "form__group",
  value = "",
  required = false,
  hasError = "",
  ...inputProps
}: InputLabelProps): JSX.Element => {
  return (
    <div className={containerClassName}>
      <label className='form__label' htmlFor='username'>
        {label}
        {required && <span className='form__required'> *</span>}
      </label>
      <Input id={id} name={name} value={value} type={type} {...inputProps} />
      {hasError && <div className='form__error'>{hasError}</div>}
    </div>
  );
};

export default InputLabel;

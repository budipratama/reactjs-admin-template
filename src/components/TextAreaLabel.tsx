import { JSX } from "react";
interface TextAreaLabelProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  containerClassName?: string;
  errorMessage?: string;
}

const TextAreaLabel = ({
  id,
  name,
  label = "",
  containerClassName = "form__group",
  value = "",
  required = false,
  errorMessage = "",
  ...inputProps
}: TextAreaLabelProps): JSX.Element => {
  return (
    <div className={containerClassName + (errorMessage ? " has-error" : "")}>
      <label className='form__label' htmlFor={name}>
        {label}
        {required && <span className='form__required'> *</span>}
      </label>
      <textarea
        className='form__textarea'
        id={id}
        name={name}
        value={value}
        {...inputProps}></textarea>
      {errorMessage && <div className='form__error'>{errorMessage}</div>}
    </div>
  );
};

export default TextAreaLabel;

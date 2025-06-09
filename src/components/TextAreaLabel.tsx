import { JSX } from "react";
interface TextAreaLabelProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  containerClassName?: string;
  hasError?: string;
}

const TextAreaLabel = ({
  id,
  name,
  label = "",
  containerClassName = "form__group",
  value = "",
  required = false,
  hasError = "",
  ...inputProps
}: TextAreaLabelProps): JSX.Element => {
  return (
    <div className={containerClassName}>
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
      {hasError && <div className='form__error'>{hasError}</div>}
    </div>
  );
};

export default TextAreaLabel;

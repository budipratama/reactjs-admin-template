import { InputHTMLAttributes, ReactNode } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  id: string;
  className?: string;
  containerClassName?: string;
}

const FormField = ({
  label,
  id,
  className = "form__input",
  containerClassName = "",
  ...inputProps
}: FormFieldProps) => (
  <div className={containerClassName}>
    <label htmlFor={id} className='form__label'>
      {label}
    </label>
    <input id={id} className={className} {...inputProps} />
  </div>
);

export default FormField;

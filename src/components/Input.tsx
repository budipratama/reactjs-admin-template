import { JSX } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  //   type?: string;
}

const Input = ({
  id,
  name,
  type = "text",
  className = "form__input",
  value = "",
  ...inputProps
}: InputProps): JSX.Element => {
  return (
    <input
      className={className}
      type={type}
      id={id}
      name={name}
      value={value}
      {...inputProps}
    />
  );
};

export default Input;

import { JSX, useState } from "react";
import Input from "./Input";

interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  hasError?: string;
  passwordStrength?: string;
}

const InputPassword = ({
  id = "password",
  name = "password",
  label = "Password",
  containerClassName = "form__group",
  required = false,
  value = "",
  passwordStrength = "",
  onChange,
  hasError = "",
  ...inputProps
}: InputPasswordProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={containerClassName}>
      <label className='form__label' htmlFor={id}>
        {label}
        {required && <span className='form__required'> *</span>}
      </label>
      <div className='form__password-wrapper'>
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          className='form__input form__input--password'
          value={value}
          name={name}
          onChange={onChange}
          {...inputProps}
        />
        <button
          type='button'
          className='form__toggle-password'
          onClick={() => setShowPassword((v) => !v)}
          aria-label='Toggle password visibility'>
          {showPassword ? (
            <i className='fa-solid fa-eye'></i>
          ) : (
            <i className='fa-solid fa-eye-slash'></i>
          )}
        </button>
      </div>
      {hasError && <div className='form__error'>{hasError}</div>}
      {value && (
        <div
          className={
            passwordStrength === "Strong Password"
              ? "form__password-strength"
              : "form__password-weak"
          }>
          {passwordStrength}
        </div>
      )}
    </div>
  );
};

export default InputPassword;

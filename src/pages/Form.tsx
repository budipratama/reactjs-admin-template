import InputPassword from "../components/InputPassword";
import { JSX, useState } from "react";
import InputLabel from "../components/InputLabel";
import { checkPasswordStrength } from "../utils/password";

const Form = (): JSX.Element => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordStrength(checkPasswordStrength(e.target.value));
    // Reset error if user types
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("Password and confirm password do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setPasswordError("Password and confirm password do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Password and confirm password do not match");
      return;
    }
    setPasswordError("");
  };

  return (
    <div className='form'>
      {/* <h1 className='form__title'>Form Page</h1> */}
      {/* <p className='form__description'>This is a sample form page.</p> */}
      <form className='form' onSubmit={handleSubmit}>
        <InputLabel
          id='username'
          name='username'
          label='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />

        <InputPassword
          required={true}
          value={password}
          onChange={handlePasswordChange}
          passwordStrength={passwordStrength}
        />

        <InputPassword
          label='Confirm Password'
          id='confirm-password'
          name='confirm-password'
          required={true}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          hasError={passwordError}
        />

        <div className='form__group'>
          <label className='form__label' htmlFor='country'>
            Country
          </label>
          <select className='form__select' id='country' name='country'>
            <option>Choose Country</option>
            <option value='indonesia'>Indonesia</option>
            <option value='usa'>USA</option>
          </select>
        </div>

        <div className='form__group'>
          <label className='form__label' htmlFor='bio'>
            Bio
          </label>
          <textarea className='form__textarea' id='bio' name='bio'></textarea>
        </div>

        <div className='form__group'>
          <label htmlFor='email' className='form__label'>
            Email
          </label>
          <input type='email' id='email' className='form__input' />
        </div>

        <div className='form__group form__group--center'>
          <button className='form__button form__button--primary' type='submit'>
            Submit
          </button>
          <button className='form__button form__button--secondary' type='reset'>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

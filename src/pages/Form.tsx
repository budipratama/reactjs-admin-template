import InputPassword from "../components/InputPassword";
import { JSX, useState } from "react";
import InputLabel from "../components/InputLabel";
import { checkPasswordStrength } from "../utils/password";
import TextAreaLabel from "../components/TextAreaLabel";
import {
  required,
  maxLength,
  minNumber,
  maxNumber,
  isNumber,
  isEmail,
  isSame,
} from "../utils/validation";

const Form = (): JSX.Element => {
  const fields = {
    username: "",
    country: "",
    address: "",
    email: "",
    postal_code: "",
    password: "",
    confirm_password: "",
  };
  const [formData, setFormData] = useState<{ [key: string]: string }>(fields);
  const { username, password, confirm_password, postal_code, address, email } =
    formData;
  const [errors, setErrors] = useState<{ [key: string]: string }>(fields);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({
    username: false,
    country: false,
    bio: false,
    email: false,
    password: false,
    confirm_password: false,
    address: false,
    postal_code: false,
  });

  const validate: { [key: string]: (value: string) => string } = {
    username: (value: string) =>
      required("Username wajib diisi")(value) ||
      maxLength(10, "Maksimal 10 karakter")(value) ||
      (value.length < 4 ? "Minimal 4 karakter" : ""),
    password: (value) =>
      required("Password wajib diisi")(value) || checkPasswordStrength(value),
    postal_code: (value) =>
      required("Postal Code wajib diisi")(value) ||
      minNumber(1, "Minimum number is 1")(value) ||
      maxNumber(10, "Maximum number is 10")(value),
    address: (value) => required("Address wajib diisi")(value),
    email: (value: string) =>
      required("Email wajib diisi")(value) || isEmail()(value),
    confirm_password: (value) =>
      required("Konfirmasi password wajib diisi")(value) ||
      isSame(password, "Konfirmasi password dan password tidak cocok")(value),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      username: validate.username(username),
      password: validate.password(password),
      confirm_password: validate.confirm_password(confirm_password),
      email: validate.email(email),
      address: validate.address(address),
      postal_code: validate.postal_code(postal_code),
    };
    setErrors(newErrors);
    setTouched({ username: true, password: true, confirm_password: true });

    if (!Object.values(newErrors).some(Boolean)) {
      console.log("Form valid:", formData);
      // Kirim data ke API
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name]) {
      setErrors({
        ...errors,
        [name]: validate[name] ? validate[name](value) : "",
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({
      ...errors,
      [name]: validate[name] ? validate[name](formData[name]) : "",
    });
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
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.username}
          required={true}
        />

        <InputPassword
          required={true}
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.password}
        />

        <InputPassword
          label='Confirm Password'
          id='confirm_password'
          name='confirm_password'
          required={true}
          value={confirm_password}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.confirm_password}
        />
        <InputLabel
          id='email'
          name='email'
          label='Email'
          value={email}
          type='email'
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.email}
          required={true}
        />

        <InputLabel
          id='postal_code'
          name='postal_code'
          label='Postal Code'
          value={postal_code}
          type='number'
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.postal_code}
          required={true}
        />

        <TextAreaLabel
          id='address'
          name='address'
          label='Address'
          value={address}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={errors.address}
          required={true}
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

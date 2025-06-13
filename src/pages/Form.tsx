import InputPassword from "../components/InputPassword";
import { JSX, useEffect, useState, useCallback } from "react";
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
import CheckboxGroup from "../components/CheckboxGroup";
import SearchableSelect from "../components/SearchableSelect";
import Switch from "../components/Switch";

const countryOptions: { label: string; value: string }[] = [
  { label: "Indonesia", value: "indonesia" },
  { label: "USA", value: "usa" },
  { label: "Singapore", value: "singapore" },
  { label: "Malaysia", value: "malaysia" },
];

const Form = (): JSX.Element => {
  console.time("Form Render Time");

  const fields = {
    username: "",
    country: "",
    address: "",
    email: "",
    postal_code: "",
    password: "",
    confirm_password: "",
  };
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [hobbiesError, setHobbiesError] = useState("");
  const [formData, setFormData] = useState<{ [key: string]: string }>(fields);
  const {
    username,
    password,
    confirm_password,
    postal_code,
    address,
    email,
    country,
  } = formData;
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
  const [switchValue, setSwitchValue] = useState(false);

  // State untuk hasil API dan mapping
  const [countryApi, setCountryApi] = useState<any[]>([]);

  const validate: { [key: string]: (value: string) => string } = {
    username: (value: string) =>
      required("Username wajib diisi")(value) ||
      maxLength(10, "Maksimal 10 karakter")(value) ||
      (value.length < 4 ? "Minimal 4 karakter" : ""),
    password: (value) =>
      required("Password wajib diisi")(value) || checkPasswordStrength(value),
    country: (value) => required("Country wajib diisi")(value),
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
      country: validate.country(country),
    };
    setErrors(newErrors);
    setTouched({ username: true, password: true, confirm_password: true });

    // Validasi hobbies
    // console.log("Hobbies:", hobbies);
    if (hobbies.length === 0) {
      setHobbiesError("Pilih minimal satu hobi!");
      return;
    } else {
      setHobbiesError("");
    }

    if (!Object.values(newErrors).some(Boolean)) {
      const payload = { ...formData, hobbies };
      console.log("Form valid:", payload);
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

  // Handler fetch API negara, memoized agar tidak trigger loop
  const handleCountrySearch = useCallback(async (search: string) => {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(search)}`
    );
    const data = await res.json();
    if (Array.isArray(data)) {
      setCountryApi(data);
    } else {
      setCountryApi([]);
    }
  }, []);

  useEffect(() => {
    console.timeEnd("Render Time");
  });
  // console.log("Form Rendered", formData);
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
          errorMessage={errors.username}
          required={true}
        />
        <InputPassword
          required={true}
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={errors.password}
        />
        <InputPassword
          label='Confirm Password'
          id='confirm_password'
          name='confirm_password'
          required={true}
          value={confirm_password}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={errors.confirm_password}
        />
        <InputLabel
          id='email'
          name='email'
          label='Email'
          value={email}
          type='email'
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={errors.email}
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
          errorMessage={errors.postal_code}
          required={true}
        />
        <TextAreaLabel
          id='address'
          name='address'
          label='Address'
          value={address}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={errors.address}
          required={true}
        />
        <CheckboxGroup
          name='hobbies'
          legend='Hobbies'
          options={countryOptions}
          values={hobbies}
          onChange={setHobbies}
          required={true}
          errorMessage={hobbiesError}
        />
        {/* <SearchableSelect
          label='Country'
          name='country'
          value={formData.country}
          minSearchLength={1}
          onChange={(val) => setFormData({ ...formData, country: val })}
          options={[
            { label: "Indonesia", value: "indonesia" },
            { label: "USA", value: "usa" },
            { label: "Singapore", value: "singapore" },
            { label: "Malaysia", value: "malaysia" },
          ]}
        /> */}
        <SearchableSelect
          label='Country'
          value={formData.country}
          onChange={(val) => setFormData({ ...formData, country: val })}
          placeholder='Search country...'
          required={true}
          searchMode='api'
          minSearchLength={2}
          rawOptions={countryApi}
          optionMapper={(item) => ({
            label: item.name?.common || item.name || "",
            value:
              item.cca2 || item.cca3 || item.name?.common || item.name || "",
          })}
          onSearch={handleCountrySearch}
          errorMessage={errors.country}
          onBlur={() => {
            setTouched((prev) => ({ ...prev, country: true }));
            setErrors((prev) => ({
              ...prev,
              country: validate.country(formData.country),
            }));
          }}
        />
        <Switch
          checked={switchValue}
          onChange={setSwitchValue}
          labelOn='Yes'
          labelOff='No'
        />
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

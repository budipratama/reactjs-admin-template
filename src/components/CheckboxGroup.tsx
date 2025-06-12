import React from "react";

type Option = {
  label: string;
  value: string;
};

type CheckboxGroupProps = {
  name: string;
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
  legend?: string;
  hasError?: string;
  required?: boolean;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  options,
  values,
  required = false,
  onChange,
  legend,
  hasError = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      onChange([...values, value]);
    } else {
      onChange(values.filter((v) => v !== value));
    }
  };

  return (
    <fieldset className='form__group'>
      {legend && (
        <legend className='form__label'>
          {legend} {required && <span className='form__required'> *</span>}
        </legend>
      )}
      <div className='form__checkbox-group'>
        {options.map((opt) => (
          <label className='form__checkbox' key={opt.value}>
            <input
              className='checkbox__trigger visuallyhidden'
              type='checkbox'
              name={name}
              value={opt.value}
              checked={values.includes(opt.value)}
              onChange={handleChange}
            />
            <span className='checkbox__symbol'>
              <svg
                aria-hidden='true'
                className='icon-checkbox'
                width='28px'
                height='28px'
                viewBox='0 0 28 28'
                version='1'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M4 14l8 7L24 7'></path>
              </svg>
            </span>
            <span className='form__checkbox-label'>{opt.label}</span>
          </label>
        ))}
      </div>
      {hasError && <div className='form__error'>{hasError}</div>}
    </fieldset>
  );
};

export default CheckboxGroup;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveHookFormValue } from 'reducers/actions/actions';
import { AppDispatch } from 'reducers/root/rootReduces';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './hookForm.css';
import { IState } from 'reducers/root/interfaces';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted: boolean;
  country: string;
  image: File;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-ZА-Я].*/, 'First letter must be uppercase'),
  age: yup
    .number()
    .required('Age is required')
    .typeError('Amount is required and must be a number')
    .min(0, 'Age must be greater than or equal to zero'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*?[A-ZА-Я])(?=.*?[a-zА-Я])(?=.*?[0-9])(?=.*?[\W_]).{4,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Password Fields must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  termsAccepted: yup.boolean().oneOf([true], 'You must accept the terms and conditions').required(),
  country: yup.string().required('Country is required'),
  image: yup
    .mixed((input): input is File => input instanceof File)
    .transform((value) => {
      return value.item(0);
    })
    .test('fileSize', 'File size is too large, it should be less than 4mb', (value) => {
      if (value) {
        return value.size <= 4000000;
      }
    })
    .test('fileFormat', 'Unsupported format. Only png and jpeg are allowed', (value) => {
      if (value) {
        return ['image/jpeg', 'image/png'].includes(value.type);
      }
    })
    .required('Image required'),
});

const HookForm: React.FC = () => {
  const countries = useSelector((state: IState) => state.hooksForm.countries);

  const generateOptions = () => {
    const selectOptions = [];
    for (let i = 0; i < countries.length; i += 1) {
      selectOptions.push({
        label: countries[i],
        value: i + 1,
      });
    }
    return selectOptions;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const dispatch = useDispatch<AppDispatch>();
  const [filteredOptions, setFilteredOptions] = useState(generateOptions());
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [liClicked, setLiClicked] = useState(false);
  const [tabMatch, saveTabMatch] = useState('');

  const handleOptionClick = (option: { label: string; value: number }) => {
    setLiClicked(true);
    setDropdownVisible(false);
    console.log('sup xx', typeof option.label, option.label);
    setValue('country', option.label);
    clearErrors('country');
  };

  const onSubmit = (data: FormData) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        dispatch(saveHookFormValue({ ...data, image: reader.result }));
      }
    };
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filtered = generateOptions().filter((option) => option.label.toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(filtered);
    setDropdownVisible(true);
    const firstSuggestion = countries.filter((country) => country.toLowerCase().startsWith(value.toLowerCase()))[0];
    saveTabMatch(firstSuggestion);
  };

  const contryKeyboardButtonClicked = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (tabMatch) {
        setValue('country', tabMatch);
        clearErrors('country');
        setDropdownVisible(false);
      }
    }
  };

  const buttonSelectCountries = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const contryOnFocus = (e: React.FocusEvent<HTMLInputElement | HTMLButtonElement>) => {
    if (liClicked || e.target.type === 'submit') {
      setLiClicked(false);
    } else {
      setDropdownVisible(true);
    }
  };

  return (
    <>
      <li>
        <Link to="/">Main</Link>
      </li>
      <form onSubmit={handleSubmit(onSubmit)} className="hooks_form">
        <div className={'label-wrapper'}>
          <label className={'between'}>
            Name:
            <input {...register('name')} />
          </label>
          {errors.name && <p className="errors_message">{errors.name.message}</p>}
        </div>

        <div className={'label-wrapper'}>
          <label className={'between'}>
            Age:
            <input type="number" {...register('age')} />
          </label>
          {errors.age && <p className="errors_message">{errors.age.message}</p>}
        </div>

        <div className={'label-wrapper'}>
          <label className={'between'}>
            Email:
            <input type="email" {...register('email')} />
          </label>
          {errors.email && <p className="errors_message">{errors.email.message}</p>}
        </div>

        <div className={'label-wrapper'}>
          <label className={'between'}>
            Password:
            <input type="password" {...register('password')} />
          </label>
          {errors.password && <p className="errors_message">{errors.password.message}</p>}
        </div>

        <div className={'label-wrapper'}>
          <label className={'between'}>
            Repeat Password:
            <input type="password" {...register('confirmPassword')} />
          </label>
          {errors.confirmPassword && <p className="errors_message">{errors.confirmPassword.message}</p>}
        </div>

        <div className={'label-wrapper'}>
          <label className={'gender-wrapper-outter'}>
            <p>Gender:</p>
            <div className={'gender-wrapper-inner'}>
              <label>
                <input type="radio" value="male" {...register('gender')} /> Male
              </label>
              <label>
                <input type="radio" value="female" {...register('gender')} /> Female
              </label>
            </div>
          </label>
          {errors.gender && <p className="errors_message">{errors.gender.message}</p>}
        </div>

        <div className={'label-wrapper terms-wrapper'}>
          <label>
            Accept Terms and Conditions:
            <input type="checkbox" {...register('termsAccepted')} />
          </label>
          {errors.termsAccepted && <p className="errors_message">{errors.termsAccepted.message}</p>}
        </div>

        <div className={'label-wrapper coutry-wrapper-div'}>
          <label className="county-label">
            Country:
            <div className="country-wrapper">
              <input
                {...register('country', {
                  onChange: (e) => {
                    handleCountryChange(e);
                  },
                })}
                onKeyDown={contryKeyboardButtonClicked}
                onFocus={contryOnFocus}
                className="country-input"
                autoComplete="off"
              />
              <button
                type="button"
                className={`${isDropdownVisible ? 'show-suggestion-button' : 'hide-suggestion-button'} suggestion-button`}
                onClick={() => buttonSelectCountries()}
              ></button>
            </div>
            {isDropdownVisible && (
              <ul className="countries-suggestions">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <li className={'countries-list'} key={option.value} onClick={() => handleOptionClick(option)}>
                      {option.label}
                    </li>
                  ))
                ) : (
                  <li>No options found</li>
                )}
              </ul>
            )}
          </label>
          {errors.country && <p className="errors_message errors_message_country">{errors.country.message}</p>}
        </div>

        <div className={'label-wrapper image-label'}>
          <p className="image-header">Upload Image:</p>
          <label>
            <input type="file" accept="image/png, image/jpeg" {...register('image')} />
          </label>
          {errors.image && <p className="errors_message errors_message_image">{errors.image.message}</p>}
        </div>

        <div className={'label-wrapper submit_form'}>
          <button type="submit" className={'hooks_submit'} disabled={Object.keys(errors).length > 0}>
            Submit
          </button>
          {Object.keys(errors).length > 0 && (
            <p className="errors_message errors_message_submit">
              {'Please fix all errors above to enable submit button'}
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default HookForm;

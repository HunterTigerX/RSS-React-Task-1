import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'reducers/root/rootReduces';
import { saveUncontrolledFormValue, uListSaved } from 'reducers/actions/actions';
import { generateOptions, validatePasswordStrength } from 'methods/methods';
import { countries } from '@data/countries';
import './UncontrolledForm.css';
import { IHooksFormData } from 'reducers/reducers/interfaces';
import { mockedResults } from '__mocks__/data_mock';
import { IPassData } from 'reducers/root/interfaces';

interface ValidationError {
  path: string;
  message: string;
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
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Password Fields must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  termsAccepted: yup.boolean().oneOf([true], 'You must accept the terms and conditions').required(),
  country: yup.string().required('Country is required'),
  image: yup
    .mixed((input): input is File => input instanceof File)
    .required('Image required')
    .test('fileSize', 'File size is too large, it should be less than 4mb', (value) => {
      if (value) {
        return value.size <= 4000000;
      }
    })
    .test('fileFormat', 'Unsupported format. Only png and jpeg are allowed', (value) => {
      if (value) {
        return ['image/jpeg', 'image/png'].includes(value.type);
      }
    }),
});

const UncontrolledForm: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const password1Ref = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [filteredOptions, setFilteredOptions] = useState(generateOptions());
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [liClicked, setLiClicked] = useState(false);
  const [tabMatch, saveTabMatch] = useState('');
  const [countryInput, saveCountryInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [gender, setGender] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passData, setPassData] = useState<IPassData>({
    strength: 0,
    number: false,
    capital: false,
    small: false,
    symbol: false,
  });

  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      name: nameRef.current ? nameRef.current.value : null,
      age: ageRef.current ? ageRef.current.value : null,
      email: emailRef.current ? emailRef.current.value : null,
      password: password1Ref.current ? password1Ref.current.value : null,
      confirmPassword: password2Ref.current ? password2Ref.current.value : null,
      gender: gender,
      termsAccepted: termsRef.current ? termsRef.current.checked : null,
      country: countryInput,
      image: imageRef.current && imageRef.current.files ? imageRef.current.files[0] : null,
    };

    try {
      const verifiedData: IHooksFormData = await schema.validate(formData, { abortEarly: false });
      setErrors({});
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          dispatch(saveUncontrolledFormValue({ ...verifiedData, image: reader.result }));
          dispatch(uListSaved());
          navigate(`/`);
        }
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      reader.readAsDataURL(verifiedData.image);
    } catch (errors) {
      if (errors instanceof yup.ValidationError) {
        const formErrors: Record<string, string> = {};
        errors.inner.forEach((singleError) => {
          const returnedError = singleError as ValidationError;
          formErrors[returnedError.path] = singleError.message;
        });
        setErrors(formErrors);
      }
    }
  };

  const handleGenderChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setGender(event.target.value);
  };

  const contryKeyboardButtonClicked = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (tabMatch) {
        saveCountryInput(tabMatch);
        setDropdownVisible(false);
      }
    }
  };
  const contryOnFocus = (e: React.FocusEvent<HTMLInputElement | HTMLButtonElement>) => {
    if (liClicked || e.target.type === 'submit') {
      setLiClicked(false);
    } else {
      setDropdownVisible(true);
    }
  };
  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    saveCountryInput(value);
    const filtered = generateOptions().filter((option) => option.label.toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(filtered);
    setDropdownVisible(true);
    const firstSuggestion = countries.filter((country) => country.toLowerCase().startsWith(value.toLowerCase()))[0];
    saveTabMatch(firstSuggestion);
  };

  const handleOptionClick = (option: { label: string; value: number }) => {
    setLiClicked(true);
    setDropdownVisible(false);
    const selectedCountry = option.label;
    saveCountryInput(selectedCountry);
  };

  const buttonSelectCountries = () => {
    const filtered = generateOptions().filter((option) => option.label.toLowerCase().includes(''.toLowerCase()));
    setFilteredOptions(filtered);
    setDropdownVisible(!isDropdownVisible);
  };

  const handleMockForm = () => {
    dispatch(saveUncontrolledFormValue(mockedResults));
    dispatch(uListSaved());
    navigate(`/`);
  };

  return (
    <>
      <div>
        <Link to="/">Main</Link>
      </div>
      <form onSubmit={handleMockForm} className="form-uncontrolled-mock">
        You can submit mocked data for test purpose
        <button type="submit" className={'hooks_submit'}>
          Submit
        </button>
      </form>
      <form onSubmit={handleFormSubmit} className="form-uncontrolled">
        <div className={'input-label-wrapper-uc'}>
          <div className={'label-wrapper-uc'}>
            <label>
              Name:
              <input type="text" ref={nameRef} />
            </label>
          </div>
          <div className={'error-wrapper'}>{errors.name && <div>{errors.name}</div>}</div>
        </div>

        <div className={'input-label-wrapper-uc'}>
          <div className={'label-wrapper-uc'}>
            <label>
              Age:
              <input type="number" ref={ageRef} />
            </label>
          </div>
          <div className={'error-wrapper'}>{errors.age && <div>{errors.age}</div>}</div>
        </div>

        <div className={'input-label-wrapper-uc'}>
          <div className={'label-wrapper-uc'}>
            <label>
              Email:
              <input type="email" ref={emailRef} />
            </label>
          </div>
          <div className={'error-wrapper'}>{errors.email && <div>{errors.email}</div>}</div>
        </div>

        <div className={'input-label-wrapper-uc'}>
          <div className={'label-wrapper-uc'}>
            <label>
              Password:
              <div className="password-strength-uc">
                <div className={passwordStrength >= 1 ? 'background-strength-uc' : ''}></div>
                <div className={passwordStrength >= 2 ? 'background-strength-uc' : ''}></div>
                <div className={passwordStrength >= 3 ? 'background-strength-uc' : ''}></div>
                <div
                  className={`background-strength-last-uc ${passwordStrength >= 4 ? 'background-strength-uc' : ''}`}
                ></div>
              </div>
              <input
                type="password"
                ref={password1Ref}
                onChange={(e) => {
                  const password = e.target.value;
                  const results = validatePasswordStrength(password);
                  setPasswordStrength(results.strength);
                  setPassData(results);
                }}
              />
            </label>
          </div>
          <div className={'checkbox-password-wrapper-uc'}>
            <div>
              <input type="checkbox" disabled={true} checked={passData.number} value="numberCheckBox" />
              <label htmlFor="numberCheckBox">1 number</label>
            </div>
            <div>
              <input type="checkbox" disabled={true} checked={passData.capital} value="numberCheckBox" />
              <label htmlFor="numberCheckBox">1 uppercased letter</label>
            </div>
            <div>
              <input type="checkbox" disabled={true} checked={passData.small} value="numberCheckBox" />
              <label htmlFor="numberCheckBox">1 lowercased letter</label>
            </div>
            <div>
              <input type="checkbox" disabled={true} checked={passData.symbol} value="numberCheckBox" />
              <label htmlFor="numberCheckBox">1 special character</label>
            </div>
          </div>
          <div className={'error-wrapper errors-password-uc'}>{errors.password && <div>{errors.password}</div>}</div>
        </div>

        <div className={'input-label-wrapper-uc repeat-password-wrapper'}>
          <div className={'label-wrapper-uc'}>
            <label>
              Repeat Password:
              <input type="password" ref={password2Ref} />
            </label>
          </div>
          <div className={'error-wrapper error-wrapper-repeat'}>
            {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
          </div>
        </div>

        <div className={'input-label-wrapper-uc gender-label-wrapper-uc'}>
          <div className={'label-wrapper-uc gender-select-wrapper'}>
            Gender:
            <div className="sex-radio">
              <label>
                <input
                  type="radio"
                  name="options"
                  value="male"
                  checked={gender === 'male'}
                  onChange={handleGenderChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="options"
                  value="female"
                  checked={gender === 'female'}
                  onChange={handleGenderChange}
                />
                Female
              </label>
            </div>
          </div>
          <div className={'error-wrapper'}>{errors.gender && <div>{errors.gender}</div>}</div>
        </div>

        <div className={'input-label-wrapper-uc'}>
          <div className={'label-wrapper-uc'}>
            <label className="terms-wrapper-uc">
              Accept Terms and Conditions:
              <input type="checkbox" ref={termsRef} />
            </label>
          </div>
          <div className={'error-wrapper'}>{errors.termsAccepted && <div>{errors.termsAccepted}</div>}</div>
        </div>

        <div className={'input-label-wrapper-uc'}>
          <div className={'label-wrapper-uc'}>
            <label className={'label-wrapper-coountry-uc'}>
              Country:
              <div className="fake-wrapper-country">
                <input
                  type="text"
                  value={countryInput}
                  onKeyDown={contryKeyboardButtonClicked}
                  onFocus={contryOnFocus}
                  onChange={handleCountryChange}
                  className="country-input-uncontrolled"
                />
                <button
                  type="button"
                  className={`${isDropdownVisible ? 'show-suggestion-button' : 'hide-suggestion-button'} suggestion-button suggestion-button-uc`}
                  onClick={() => buttonSelectCountries()}
                ></button>
              </div>
            </label>
          </div>
          {isDropdownVisible && (
            <ul className="countries-suggestions-uncontrolled">
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
          <div className={'error-wrapper'}>{errors.country && <div>{errors.country}</div>}</div>
        </div>

        <div className={'input-label-wrapper-uc'}>
          <div className={'label-wrapper-uc'}>
            <label className={'image-label-wrapper-uc'}>
              Upload Image:
              <input type="file" accept="image/png, image/jpeg" ref={imageRef} />
            </label>
          </div>
          <div className={'error-wrapper error-wrapper-image-uc'}>{errors.image && <div>{errors.image}</div>}</div>
        </div>

        <div className={'input-label-wrapper-uc form-submit-uc'}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default UncontrolledForm;

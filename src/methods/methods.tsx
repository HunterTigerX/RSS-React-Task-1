import { countries } from '@data/countries';

export const generateOptions = () => {
  const selectOptions = [];
  for (let i = 0; i < countries.length; i += 1) {
    selectOptions.push({
      label: countries[i],
      value: i + 1,
    });
  }
  return selectOptions;
};

export const validatePasswordStrength = (password: string) => {
  let results = {
    strength: 0,
    number: false,
    capital: false,
    small: false,
    symbol: false,
  };

  if (/\d/.test(password)) {
    results.strength += 1;
    results.number = true;
  }

  if (/[A-ZА-Я]/.test(password)) {
    results.strength += 1;
    results.capital = true;
  }
  if (/[a-zа-я]/.test(password)) {
    results.strength += 1;
    results.small = true;
  }
  if (/\W/.test(password)) {
    results.strength += 1;
    results.symbol = true;
  }
  return results;
};

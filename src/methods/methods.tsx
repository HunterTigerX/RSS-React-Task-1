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

export const loadLocationData = () => {
  const currentUrl = window.location.href;

  const splittedUrl = currentUrl.split('?');
  if (splittedUrl.length === 1) {
    return {
      color: null,
      page: 1,
    };
  } else {
    const splittedArgs = splittedUrl[1].split('&');
    return {
      color: splittedArgs[0].replace('id=', ''),
      page: Number(splittedArgs[1].replace('page=', '')),
      pokemonId: Number(splittedArgs[2]),
    };
  }
};

export const getQueryParams = () => {
  const currentUrl = window.location.href;
  const hostName = window.location.origin;
  const onlyPath = currentUrl.replace(hostName, '');
  return onlyPath.slice(1, onlyPath.length);
};

export const loadPokemonId = () => {
  const pokemonId = location.pathname.split('/')[4];
  return pokemonId
};
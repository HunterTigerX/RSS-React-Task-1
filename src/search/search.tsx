import { useState, useEffect } from 'react';

const Search = () => {
  console.log('1');
  let [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []);

  function checkLastSearch() {
    const lastTerm = localStorage.getItem('searchTerm');
    console.log(lastTerm);
    if (lastTerm !== null && lastTerm === '') {
      searchTerm = lastTerm;
    } 
  }
  checkLastSearch();

  function handleSearch() {
    localStorage.setItem('searchTerm', searchTerm);
  }

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search term..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;

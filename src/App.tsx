import './App.css';
import Search from './search/search';

function App() {
  console.log('app')
  return (
    <div className="container">
      <div className="top-section">
        <h2>Top Section</h2>
        <Search></Search>
      </div>
      <div className="bottom-section">
        <h2>Bottom Section</h2>
        {/* Content for the bottom section */}
      </div>
    </div>
  );
}

export default App;

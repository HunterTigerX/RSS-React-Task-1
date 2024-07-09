import { Component } from 'react';
import Search from './search/Search';
import Results from './results/Results';
import ErrorButton from './ErrorButton/ErrorButton';
import './App.css';

interface SearchProps {
  onSearchUpdate: () => void;
}

interface IUserErrors {
  searchUpdated: boolean;
}

class App extends Component<SearchProps, IUserErrors> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchUpdated: false,
    };
  }

  handleSearchUpdate = () => {
    this.setState({ searchUpdated: true });
  };

  render() {
    return (
      <div className="container">
        <div className="container">
          <Search onSearchEnd={this.handleSearchUpdate}></Search>
          <ErrorButton errorEnable={''}></ErrorButton>
          <Results onSearchEnd={this.handleSearchUpdate}></Results>
        </div>
      </div>
    );
  }
}

export default App;

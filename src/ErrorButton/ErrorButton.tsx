import { Component } from 'react';

type ErrorButtonState = {
  errorEnable: string;
};

interface IErrors {
  hasError: boolean;
  errorMessage: string;
}

class ErrorButton extends Component<ErrorButtonState, IErrors> {
  constructor(props: ErrorButtonState) {
    super(props);
    this.state = {
      errorMessage: '',
      hasError: false,
    };
  }

  throwError = () => {
    this.setState({ errorMessage: 'This is a manual message from button click', hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('This is a manual message from button click');
    }
    return <button onClick={this.throwError}>Throw Error</button>;
  }
}

export default ErrorButton;

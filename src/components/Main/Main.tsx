import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IState } from 'reducers/root/interfaces';
import './Main.css';

const Main: React.FC = () => {
  const savedUncontrolledInputs = useSelector((state: IState) => state.uncontrolledForm.savedUncontrolledInputs);
  const savedHooksInputs = useSelector((state: IState) => state.hooksForm.savedHooksInputs);
  const lastWasHook = useSelector((state: IState) => state.stateReducer.hooksLastAdded);
  const lastWasUncontrolled = useSelector((state: IState) => state.stateReducer.uncontrolledLastAdded);

  const fillForm = (dataArray: string | string[], type: string) => {
    const isThisFormLast = type === 'hooks' ? lastWasHook : lastWasUncontrolled;
    const results = [];
    for (let i = dataArray.length - 1; i >= 0; i -= 1) {
      const data = JSON.parse(dataArray[i]);
      results.push(
        <div
          key={`${type}${i}`}
          className={`${i === 0 ? 'firstElement' : ''} data-wrapper ${i === dataArray.length - 1 && isThisFormLast ? 'lastElement' : ''}`}
        >
          <div>Name: {data.name}</div>
          <div>age: {data.age}</div>
          <div>email: {data.email}</div>
          <div>password: {data.password}</div>
          <div>confirmed password: {data.confirmPassword}</div>
          <div>gender: {data.gender}</div>
          <div>terms accepted: {String(data.termsAccepted)}</div>
          <div>country: {data.country}</div>
          <div className={`submittedImage`} style={{ backgroundImage: `url(${data.image})` }}></div>
        </div>
      );
    }
    return results;
  };

  return (
    <div className="main-wrapper">
      <h1>Main Page</h1>
      <div className="navigation">
        <div>
          <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        </div>
        <div>
          <Link to="/hook-form">React Hook Form</Link>
        </div>
      </div>
      <div className={'results-wrapper-outer'}>
        <div className={'results-wrapper results-wrapper-uncontrolled'}>
          <h3>Uncontrolled Form Data</h3>
          {fillForm(savedUncontrolledInputs, 'uncontrolled')}
        </div>
        <div className={'results-wrapper results-wrapper-hooks'}>
          <h3>React Hook Form Data</h3>
          {fillForm(savedHooksInputs, 'hooks')}
        </div>
      </div>
    </div>
  );
};

export default Main;

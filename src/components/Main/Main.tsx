import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IState } from 'reducers/root/interfaces';

const Main: React.FC = () => {
  const savedUncontrolledInputs = useSelector((state: IState) => state.uncontrolledForm.savedUncontrolledInputs);
  const savedFormsInputs = useSelector((state: IState) => state.hooksForm.savedFormsInputs);
  console.log('savedUncontrolledInputs', savedUncontrolledInputs);
  console.log('savedFormsInputs', savedFormsInputs);
  return (
    <div>
      <h1>Main Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/uncontrolled-form">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/hook-form">React Hook Form</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Main;

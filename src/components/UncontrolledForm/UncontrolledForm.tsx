import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'reducers/root/rootReduces';
import { saveUncontrolledFormValue } from 'reducers/actions/actions';

const UncontrolledForm: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // alert(`Submitted Name: ${nameRef.current?.value}`);
    if (nameRef.current) {
      dispatch(saveUncontrolledFormValue(nameRef.current.value));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" ref={nameRef} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <li>
        <Link to="/">Main</Link>
      </li>
    </>
  );
};

export default UncontrolledForm;

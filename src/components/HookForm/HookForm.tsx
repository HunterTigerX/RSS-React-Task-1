import React from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
}

const HookForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(`Submitted Name: ${data.name}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input {...register('name')} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default HookForm;

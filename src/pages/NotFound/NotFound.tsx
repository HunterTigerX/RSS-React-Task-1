import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate('/', { replace: true });

  return (
    <div>
      <p>"404. Sorry, the page you visited does not exist."</p>
      <button onClick={handleClick}>Back Home</button>
    </div>
  );
};

export { NotFound };

import { useNavigate } from 'react-router';
import '../components/notFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <div>
      <p>`404. Sorry, the page you visited does not exist.`</p>
      <button className={'goHome'} onClick={handleClick}>
        Back Home
      </button>
    </div>
  );
};

export { NotFound };

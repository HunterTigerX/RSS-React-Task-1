import { useRouter } from 'next/router';
const NotFound = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/');
  };

  return (
    <div>
      <p>`404. Sorry, the page you visited does not exist.`</p>
      <button onClick={handleClick}>Back Home</button>
    </div>
  );
};

export { NotFound };


import { Outlet } from 'react-router-dom';
import Search from '@components/search/Search';
import ErrorButton from '@components/ErrorButton/ErrorButton';
import Pagination from '@components/Pagination/Pagination';
import './Main.css';

const Main = () => {

  return (
    <div className="container">
      <div className="container">
        <Search></Search>
        <ErrorButton errorEnable={''}></ErrorButton>
        <Outlet />
        <Pagination></Pagination>
      </div>
    </div>
  );
};

export { Main };

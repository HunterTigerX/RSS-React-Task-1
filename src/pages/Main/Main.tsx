import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Search from '../../components/search/Search';
import Results from '../../components/results/Results';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import './Main.css';

const Main = () => {
  let [reRender, rerender] = useState(0);

  const reRenderPage = () => {
    rerender((reRender += 1));
  };

  return (
    <div className="container">
      <div className="container">
        <Search onSearchEnd={reRenderPage}></Search>
        <ErrorButton errorEnable={''}></ErrorButton>
        <Results onPageChanged={reRenderPage}></Results>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export { Main };

import { Provider } from 'react-redux';
import { Main } from './Main';
import store from '../reducers/root/rootReduces';

export default function Home() {
  return (
    <Provider store={store}>
      <Main pageId={'1'} pokemonId={undefined} />
    </Provider>
  );
}

import { Provider } from 'react-redux';
import store from '../reducers/root/rootReduces';
import Main from '../page';

export default function Home() {
  return (
    <Provider store={store}>
      <Main pageId={'1'} pokemonId={undefined} />
    </Provider>
  );
}

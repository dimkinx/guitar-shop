import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import CatalogFilter from './catalog-filter';
import {Namespace} from '../../constants';
import {StatusType} from '../../enums';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  [Namespace.Filter]: {
    priceRange: {
      min: 0,
      max: Infinity,
    },
    status: StatusType.Idle,
  },
});

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilter />
        </Router>
      </Provider>);

    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(/Фильтр/i);
    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
  });
});

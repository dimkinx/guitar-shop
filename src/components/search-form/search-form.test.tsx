import * as Redux from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Router} from 'react-router-dom';
import SearchForm from './search-form';
import {createMemoryHistory} from 'history';
import {createMockProducts} from '../../mocks/products';
import {StatusType} from '../../enums';
import {Namespace} from '../../constants';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockProducts = createMockProducts(5);

const store = mockStore({
  [Namespace.Search]: {
    foundProducts: mockProducts,
    status: StatusType.Success,
  },
});

const emptyStore = mockStore({
  [Namespace.Search]: {
    foundProducts: [],
    status: StatusType.Success,
  },
});

describe('Component: SearchForm', () => {
  it('should render correctly with found products', () => {
    render(
      <Redux.Provider store={store}>
        <Router history={history}>
          <SearchForm />
        </Router>
      </Redux.Provider>);

    expect(screen.getByPlaceholderText(/что вы ищите/i)).toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeNull();
    userEvent.click(screen.getByPlaceholderText(/что вы ищите/i));
    expect(screen.queryAllByRole('listitem')).toHaveLength(mockProducts.length);
  });

  it('should render correctly with empty products', () => {
    emptyStore.dispatch = jest.fn();

    render(
      <Redux.Provider store={emptyStore}>
        <Router history={history}>
          <SearchForm />
        </Router>
      </Redux.Provider>);

    expect(screen.getByPlaceholderText(/что вы ищите/i)).toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeNull();
    userEvent.click(screen.getByPlaceholderText(/что вы ищите/i));
    expect(screen.getByText(/Поиск не дал результатов/i)).toBeInTheDocument();
  });
});

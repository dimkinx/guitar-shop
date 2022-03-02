import * as Redux from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Header from './header';
import {StatusType} from '../../../common/enums';
import {Namespace} from '../../../common/constants';
import {productsAdapter} from '../../../store/cart/cart-reducer';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  [Namespace.Search]: {
    foundProducts: [],
    status: StatusType.Idle,
  },
  [Namespace.Cart]: {
    products: productsAdapter.getInitialState(),
  },
});

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <Redux.Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Redux.Provider>);

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Корзина/i)).toBeInTheDocument();
  });
});

import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import Card from './card';
import {createMockProduct} from '../../../../mocks/products';
import {APP_LOCALE, Namespace} from '../../../../common/constants';
import {productsAdapter} from '../../../../store/cart/cart-reducer';
import {configureMockStore} from '@jedmao/redux-mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockProduct = createMockProduct();

const store = mockStore({
  [Namespace.Cart]: {
    products: productsAdapter.getInitialState(),
  },
});

describe('Component: Card', () => {
  store.dispatch = jest.fn();

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Card
            onCurrentProductSelect={jest.fn}
            onModalCartAddOpenClick={jest.fn}
            product={mockProduct}
          />
        </Router>
      </Provider>);

    expect(screen.getByAltText(new RegExp(mockProduct.name,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockProduct.name,'i'))).toBeInTheDocument();
    expect(screen.getByTestId('price').textContent).toEqual(`Цена:${mockProduct.price.toLocaleString(APP_LOCALE)} ₽`);
    expect(screen.getByRole('link', {name: /Подробнее/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Купить/i})).toBeInTheDocument();
  });
});

import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import CartDelete from './cart-delete';
import {createMockProduct} from '../../../mocks/products';
import {Namespace} from '../../../common/constants';
import {productsAdapter} from '../../../store/cart/cart-reducer';

const mockProduct = {...createMockProduct(), count: 1};
const mockStore = configureMockStore();

const store = mockStore({
  [Namespace.Cart]: {
    products: productsAdapter.getInitialState(),
  },
});

describe('Component: CartDelete', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <CartDelete
          isModalOpen
          onModalOpenSelect={jest.fn()}
          product={mockProduct}
        />
      </Provider>);

    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(/Удалить этот товар/i);
  });
});

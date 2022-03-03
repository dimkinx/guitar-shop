import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import CartAdd from './cart-add';
import {createMockProduct} from '../../../mocks/products';
import {Namespace} from '../../../common/constants';
import {productsAdapter} from '../../../store/cart/cart-reducer';

const mockProduct = createMockProduct();
const mockStore = configureMockStore();

const store = mockStore({
  [Namespace.Cart]: {
    products: productsAdapter.getInitialState(),
  },
});

describe('Component: CartAdd', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <CartAdd
          isModalOpen
          onModalOpenSelect={jest.fn()}
          onAddToCartButtonClick={jest.fn()}
          product={mockProduct}
        />
      </Provider>);

    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(/Добавить товар в корзину/i);
    expect(screen.getByRole('heading', {level: 3})).toHaveTextContent(new RegExp(mockProduct.name,'i'));
  });
});

import {Router} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import CartAddSuccess from './cart-add-success';

const history = createMemoryHistory();
const onModalOpenSelect = jest.fn();

describe('Component: CartAddSuccess', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <CartAddSuccess
          isModalOpen
          onModalOpenSelect={onModalOpenSelect}
        />
      </Router>);

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  });
});

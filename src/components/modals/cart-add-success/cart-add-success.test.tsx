import {render, screen} from '@testing-library/react';
import CartAddSuccess from './cart-add-success';

const onModalOpenSelect = jest.fn();

describe('Component: CartAddSuccess', () => {
  it('should render correctly', () => {
    render(
      <CartAddSuccess
        isModalOpen
        onModalOpenSelect={onModalOpenSelect}
      />);

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  });
});

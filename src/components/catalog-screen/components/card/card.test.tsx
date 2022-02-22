import {Router} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import Card from './card';
import {createMockProduct} from '../../../../mocks/products';
import {APP_LOCALE} from '../../../../common/constants';

const history = createMemoryHistory();
const mockProduct = createMockProduct();

describe('Component: Card', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Card product={mockProduct} />
      </Router>);

    expect(screen.getByAltText(new RegExp(mockProduct.name,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockProduct.name,'i'))).toBeInTheDocument();
    expect(screen.getByTestId('price').textContent).toEqual(`Цена:${mockProduct.price.toLocaleString(APP_LOCALE)} ₽`);
    expect(screen.getByRole('link', {name: /Подробнее/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Купить/i})).toBeInTheDocument();
  });
});

import {Router} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import ProductCard from './product-card';
import {createMockProduct} from '../../mocks/products';
import {APP_LOCALE} from '../../constants';

const history = createMemoryHistory();
const mockProduct = createMockProduct();

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ProductCard product={mockProduct} />
      </Router>);

    expect(screen.getByAltText(new RegExp(mockProduct.name,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockProduct.name,'i'))).toBeInTheDocument();
    expect(screen.getByTestId('price').textContent).toEqual(`Цена:${mockProduct.price.toLocaleString(APP_LOCALE)} ₽`);
    expect(screen.getByRole('link', {name: /Подробнее/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Купить/i})).toBeInTheDocument();
  });
});

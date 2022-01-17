import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import CatalogSort from './catalog-sort';
import {Namespace} from '../../constants';

const mockStore = configureMockStore();

const store = mockStore({
  [Namespace.Sort]: {
    sortType: null,
    orderType: null,
  },
});

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <CatalogSort />
      </Provider>);

    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(/Сортировать/i);
    expect(screen.getByRole('button', {name: /по цене/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /по популярности/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /по возрастанию/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /по убыванию/i})).toBeInTheDocument();
  });
});

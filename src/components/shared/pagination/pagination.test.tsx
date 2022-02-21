import * as Redux from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import ReactRouter from 'react-router';
import {Router} from 'react-router-dom';
import Pagination from './pagination';
import {createMemoryHistory} from 'history';
import {StatusType} from '../../../enums';
import {Namespace} from '../../../constants';
import {createMockProducts} from '../../../mocks/products';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockProducts = createMockProducts(27);

const store = mockStore({
  [Namespace.Products]: {
    products: mockProducts,
    totalCount: mockProducts.length,
    status: StatusType.Success,
  },
});

describe('Component: Pagination', () => {
  it('should render correctly when user navigate to "/catalog/page_1"', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({pageId: '1'});

    render(
      <Redux.Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Redux.Provider>);

    expect(screen.queryByText(/Назад/i)).toBeNull();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  it('should render correctly when user navigate to "/catalog/page_2"', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({pageId: '2'});

    render(
      <Redux.Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Redux.Provider>);

    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  it('should render correctly when user navigate to "/catalog/page_3"', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({pageId: '3'});

    render(
      <Redux.Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Redux.Provider>);

    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.queryByText(/Далее/i)).toBeNull();
  });
});

import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import {setProducts, setProductsStatus, setProductsTotalCount} from './products-actions';
import {fetchProducts} from './products-api-actions';
import {State} from '../../types/state';
import {createMockProducts} from '../../mocks/products';
import {APIRoute, RESPONSE_HEADER_X_TOTAL_COUNT} from '../../constants';
import {StatusType} from '../../enums';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const store = mockStore();
const mockProducts = createMockProducts();
const mockHeaders = {[RESPONSE_HEADER_X_TOTAL_COUNT]: mockProducts.length};
const mockSearchParams = new URLSearchParams('');

describe('Async API actions: products', () => {
  it('should dispatch setProducts, setProductsTotalCount and setProductsStatus when GET /guitars', async () => {
    mockAPI
      .onGet(APIRoute.Products)
      .reply(200, mockProducts, mockHeaders);

    await store.dispatch(fetchProducts(mockSearchParams));

    expect(store.getActions()).toEqual([
      setProductsStatus(StatusType.Loading),
      setProducts(mockProducts),
      setProductsTotalCount(Number(mockHeaders[RESPONSE_HEADER_X_TOTAL_COUNT])),
      setProductsStatus(StatusType.Success),
    ]);
  });
});

import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import {setFoundProducts, setFoundProductsStatus} from './search-actions';
import {fetchFoundProducts} from './search-api-actions';
import {State} from '../../types/state';
import {createMockProducts} from '../../mocks/products';
import {APIRoute} from '../../constants';
import {StatusType} from '../../enums';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const store = mockStore();
const mockProducts = createMockProducts();
const mockSearchParams = new URLSearchParams('');

describe('Async API actions: search', () => {
  it('should dispatch setFoundProducts and setFoundProductsStatus when GET /guitars', async () => {
    mockAPI
      .onGet(APIRoute.GetProducts())
      .reply(200, mockProducts);

    await store.dispatch(fetchFoundProducts(mockSearchParams));

    expect(store.getActions()).toEqual([
      setFoundProductsStatus(StatusType.Loading),
      setFoundProducts(mockProducts),
      setFoundProductsStatus(StatusType.Success),
    ]);
  });
});

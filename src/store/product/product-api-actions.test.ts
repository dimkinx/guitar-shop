import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import {setProduct, setProductStatus} from './product-actions';
import {fetchProduct} from './product-api-actions';
import {State} from '../../types/state';
import {createMockProduct} from '../../mocks/products';
import {APIRoute} from '../../constants';
import {StatusType} from '../../enums';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const store = mockStore();
const mockProduct = createMockProduct();
const mockProductId = mockProduct.id;

describe('Async API actions: product', () => {
  it('should dispatch setProduct and setProductStatus when GET /guitars/productId', async () => {
    mockAPI
      .onGet(APIRoute.GetProduct(mockProductId))
      .reply(200, mockProduct);

    await store.dispatch(fetchProduct(mockProductId));

    expect(store.getActions()).toEqual([
      setProductStatus(StatusType.Loading),
      setProduct(mockProduct),
      setProductStatus(StatusType.Success),
    ]);
  });
});

import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import {fetchPriceRange} from './filter-api-actions';
import {setPriceRangeMax, setPriceRangeMin, setPriceRangeStatus} from './filter-actions';
import {State} from '../../types/state';
import {createMockProduct} from '../../mocks/products';
import {APIRoute} from '../../common/constants';
import {StatusType} from '../../common/enums';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const store = mockStore();
const mockProductFirst = createMockProduct();
const mockProductSecond = createMockProduct();
const mockSearchParams = new URLSearchParams('');

describe('Async API actions: filter', () => {
  it('should dispatch setPriceRangeMin, setPriceRangeMax and setPriceRangeStatus when GET /guitars', async () => {
    mockAPI
      .onGet(APIRoute.GetProducts())
      .replyOnce(200, [mockProductFirst])
      .onGet(APIRoute.GetProducts())
      .replyOnce(200, [mockProductSecond]);

    await store.dispatch(fetchPriceRange(mockSearchParams));

    expect(store.getActions()).toEqual([
      setPriceRangeStatus(StatusType.Loading),
      setPriceRangeMin(mockProductFirst.price),
      setPriceRangeMax(mockProductSecond.price),
      setPriceRangeStatus(StatusType.Success),
    ]);
  });
});

import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import {postCoupon} from './cart-api-actions';
import {setCouponPostStatus, setCouponValidityStatus, setDiscount} from './cart-actions';
import {State} from '../../types/state';
import {CouponValidityType, StatusType} from '../../common/enums';
import {APIRoute} from '../../common/constants';
import {datatype, lorem} from 'faker';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const mockCoupon = lorem.word();
const mockDiscount = datatype.number(100);

describe('Async API actions: cart', () => {
  it('should dispatch setCouponPostStatus, setDiscount and setCouponValidityStatus when POST /coupons', async () => {
    const store = mockStore();

    mockAPI
      .onPost(APIRoute.PostCoupon())
      .reply(200, mockDiscount);

    await store.dispatch(postCoupon(mockCoupon));

    expect(store.getActions()).toEqual([
      setCouponPostStatus(StatusType.Loading),
      setDiscount(mockDiscount),
      setCouponValidityStatus(CouponValidityType.Valid),
      setCouponPostStatus(StatusType.Success),
    ]);
  });
});

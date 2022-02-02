import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import {setFetchedReviews, setReview, setReviewsStatus, setReviewStatus, setReviewsTotalCount} from './reviews-actions';
import {fetchReviews, postReview} from './reviews-api-actions';
import {State} from '../../types/state';
import {createMockReview, createMockReviews} from '../../mocks/reviews';
import {APIRoute, RESPONSE_HEADER_X_TOTAL_COUNT} from '../../constants';
import {StatusType} from '../../enums';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const mockReviews = createMockReviews();
const mockReview = createMockReview();
const mockHeaders = {[RESPONSE_HEADER_X_TOTAL_COUNT]: mockReviews.length};
const mockProductId = 1;

describe('Async API actions: reviews', () => {
  it('should dispatch setFetchedReviews, setReviewsTotalCount and setReviewsStatus when GET /guitars/productId:/comments', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.GetReviews(mockProductId))
      .reply(200, mockReviews, mockHeaders);

    await store.dispatch(fetchReviews(mockProductId));

    expect(store.getActions()).toEqual([
      setReviewsStatus(StatusType.Loading),
      setFetchedReviews(mockReviews),
      setReviewsTotalCount(Number(mockHeaders[RESPONSE_HEADER_X_TOTAL_COUNT])),
      setReviewsStatus(StatusType.Success),
    ]);
  });

  it('should dispatch setReview and setReviewStatus when POST /comments', async () => {
    const store = mockStore();

    mockAPI
      .onPost(APIRoute.PostReview())
      .reply(200, mockReview);

    await store.dispatch(postReview(mockReview));

    expect(store.getActions()).toEqual([
      setReviewStatus(StatusType.Loading),
      setReview(mockReview),
      setReviewStatus(StatusType.Success),
    ]);
  });
});

import {reviewsInitialState, reviewsReducer} from './reviews-reducer';
import {createMockReview, createMockReviews} from '../../mocks/reviews';
import {setReview, setReviews, setReviewsStatus, setReviewStatus, setReviewsTotalCount} from './reviews-actions';
import {StatusType} from '../../common/enums';

const mockActionType = 'UNKNOWN_ACTION';
const mockReview = createMockReview();
const mockReviews = createMockReviews();
const mockTotalCount = mockReviews.length;
const mockFetchStatus = StatusType.Success;

describe('Reducer: reviews', () => {
  it('without additional parameters should return initial state', () => {
    expect(reviewsReducer(void 0, {type: mockActionType}))
      .toEqual(reviewsInitialState);
  });

  it('should set review', () => {
    expect(reviewsReducer(reviewsInitialState, setReview(mockReview)))
      .toEqual({
        ...reviewsInitialState,
        reviews: [mockReview],
        totalCount: 1,
      });
  });

  it('should set post review status', () => {
    expect(reviewsReducer(reviewsInitialState, setReviewStatus(mockFetchStatus)))
      .toEqual({
        ...reviewsInitialState,
        postStatus: mockFetchStatus,
      });
  });

  it('should set reviews', () => {
    expect(reviewsReducer(reviewsInitialState, setReviews(mockReviews)))
      .toEqual({
        ...reviewsInitialState,
        reviews: mockReviews,
      });
  });

  it('should set fetched reviews', () => {
    expect(reviewsReducer(reviewsInitialState, setReviews(mockReviews)))
      .toEqual({
        ...reviewsInitialState,
        reviews: mockReviews,
      });
  });

  it('should set reviews total count', () => {
    expect(reviewsReducer(reviewsInitialState, setReviewsTotalCount(mockTotalCount)))
      .toEqual({
        ...reviewsInitialState,
        totalCount: mockTotalCount,
      });
  });

  it('should set fetch reviews status', () => {
    expect(reviewsReducer(reviewsInitialState, setReviewsStatus(mockFetchStatus)))
      .toEqual({
        ...reviewsInitialState,
        status: mockFetchStatus,
      });
  });
});

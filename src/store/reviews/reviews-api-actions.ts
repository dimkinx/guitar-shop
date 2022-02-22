import {toast} from 'react-toastify';
import {ThunkActionResult} from '../../types/thunk-action';
import {setFetchedReviews, setReview, setReviewsStatus, setReviewStatus, setReviewsTotalCount} from './reviews-actions';
import {Review, ReviewPost} from '../../types/review';
import {OrderType, SortType, StatusType} from '../../common/enums';
import {APIRoute, ErrorMessage, SearchParamPostfix, RESPONSE_HEADER_X_TOTAL_COUNT, REVIEWS_COUNT_PER_STEP} from '../../common/constants';

const fetchReviews = (productId: number, reviewId = 0): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setReviewsStatus(StatusType.Loading));
    await api.get<Review[]>(APIRoute.GetReviews(productId), {params: {
      [SearchParamPostfix.Start]: reviewId,
      [SearchParamPostfix.Limit]: REVIEWS_COUNT_PER_STEP,
      [SearchParamPostfix.Sort]: SortType.Date,
      [SearchParamPostfix.Order]: OrderType.Descending,
    }})
      .then(({data, headers}) => {
        dispatch(setFetchedReviews(data));
        dispatch(setReviewsTotalCount(Number(headers[RESPONSE_HEADER_X_TOTAL_COUNT])));
        dispatch(setReviewsStatus(StatusType.Success));
      })
      .catch(() => {
        dispatch(setReviewsStatus(StatusType.Failure));
        toast.error(ErrorMessage.FailedToLoadReviews);
      });
  }
);

const postReview = (review: ReviewPost): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setReviewStatus(StatusType.Loading));
    await api.post<Review>(APIRoute.PostReview(), review)
      .then(({data}) => {
        dispatch(setReview(data));
        dispatch(setReviewStatus(StatusType.Success));
      })
      .catch(({response}) => {
        dispatch(setReviewStatus(StatusType.Failure));
        toast.error(response && response.status === 400
          ? ErrorMessage.FailedToPostInvalidReview
          : ErrorMessage.FailedToPostReview,
        );
      });
  }
);

export {fetchReviews, postReview};

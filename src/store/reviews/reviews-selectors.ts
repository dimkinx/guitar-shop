import {createSelector} from 'reselect';
import {State} from '../../types/state';
import {Review} from '../../types/review';
import {StatusType} from '../../common/enums';

const getReviews = (state: State): Review[] => state.reviews.reviews;
const getReviewsTotalCount = (state: State): number => state.reviews.totalCount;
const getReviewsStatus = (state: State): StatusType => state.reviews.status;
const getReviewStatus = (state: State): StatusType => state.reviews.postStatus;

const isReviewsIdle = createSelector(
  getReviewsStatus,
  (status: StatusType): boolean => status === StatusType.Idle,
);

const isReviewsLoading = createSelector(
  getReviewsStatus,
  (status: StatusType): boolean => status === StatusType.Loading,
);

const isReviewsSuccess = createSelector(
  getReviewsStatus,
  (status: StatusType): boolean => status === StatusType.Success,
);

const isReviewsFailure = createSelector(
  getReviewsStatus,
  (status: StatusType): boolean => status === StatusType.Failure,
);

const isReviewLoading = createSelector(
  getReviewStatus,
  (postStatus: StatusType): boolean => postStatus === StatusType.Loading,
);

const isReviewSuccess = createSelector(
  getReviewStatus,
  (postStatus: StatusType): boolean => postStatus === StatusType.Success,
);

const isReviewFailure = createSelector(
  getReviewStatus,
  (postStatus: StatusType): boolean => postStatus === StatusType.Failure,
);

export {
  getReviews,
  getReviewsTotalCount,
  isReviewsIdle,
  isReviewsLoading,
  isReviewsSuccess,
  isReviewsFailure,
  isReviewLoading,
  isReviewSuccess,
  isReviewFailure
};

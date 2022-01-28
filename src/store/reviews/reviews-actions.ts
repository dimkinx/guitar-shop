import {createAction} from '@reduxjs/toolkit';
import {ActionType, StatusType} from '../../enums';
import {Review} from '../../types/review';

const setReview = createAction(
  ActionType.SetReview,
  (review: Review) => ({
    payload: {
      review,
    },
  }),
);

const setReviewStatus = createAction(
  ActionType.SetReviewStatus,
  (postStatus: StatusType) => ({
    payload: {
      postStatus,
    },
  }),
);

const setReviews = createAction(
  ActionType.SetReviews,
  (reviews: Review[]) => ({
    payload: {
      reviews,
    },
  }),
);

const setFetchedReviews = createAction(
  ActionType.SetFetchedReviews,
  (reviews: Review[]) => ({
    payload: {
      reviews,
    },
  }),
);

const setReviewsTotalCount = createAction(
  ActionType.SetReviewsTotalCount,
  (totalCount: number) => ({
    payload: {
      totalCount,
    },
  }),
);

const setReviewsStatus = createAction(
  ActionType.SetReviewsStatus,
  (status: StatusType) => ({
    payload: {
      status,
    },
  }),
);

export {setReview, setReviewStatus, setReviews, setFetchedReviews, setReviewsTotalCount, setReviewsStatus};

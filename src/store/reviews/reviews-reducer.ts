import {createReducer} from '@reduxjs/toolkit';
import {setFetchedReviews, setReview, setReviews, setReviewsStatus, setReviewStatus, setReviewsTotalCount} from './reviews-actions';
import {ReviewsState} from '../../types/state';
import {StatusType} from '../../common/enums';

const reviewsInitialState: ReviewsState = {
  reviews: [],
  totalCount: 0,
  status: StatusType.Idle,
  postStatus: StatusType.Idle,
};

const reviewsReducer = createReducer(reviewsInitialState, (builder) => {
  builder
    .addCase(setReview, (state, action) => {
      state.reviews.unshift(action.payload.review);
      state.totalCount += 1;
    })
    .addCase(setReviewStatus, (state, action) => {
      state.postStatus = action.payload.postStatus;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload.reviews;
    })
    .addCase(setFetchedReviews, (state, action) => {
      state.reviews.push(...action.payload.reviews);
    })
    .addCase(setReviewsTotalCount, (state, action) => {
      state.totalCount = action.payload.totalCount;
    })
    .addCase(setReviewsStatus, (state, action) => {
      state.status = action.payload.status;
    });
});

export {reviewsInitialState, reviewsReducer};

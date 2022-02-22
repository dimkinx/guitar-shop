import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchReviews} from '../../../../store/reviews/reviews-api-actions';
import {getReviews, getReviewsTotalCount, isReviewsFailure, isReviewsIdle, isReviewsLoading, isReviewsSuccess} from '../../../../store/reviews/reviews-selectors';
import {Rate} from '../../../shared/shared';
import {addClassModifier} from '../../../../utils/utils';
import {APP_LOCALE, REVIEWS_COUNT_PER_STEP} from '../../../../common/constants';

type ReviewListProps = {
  productId: number;
}

function ReviewList({productId}: ReviewListProps): JSX.Element {
  const reviews = useSelector(getReviews);
  const reviewsTotalCount = useSelector(getReviewsTotalCount);
  const isIdleStatus = useSelector(isReviewsIdle);
  const isSuccessStatus = useSelector(isReviewsSuccess);
  const isLoadingStatus = useSelector(isReviewsLoading);
  const isFailureStatus = useSelector(isReviewsFailure);

  const dispatch = useDispatch();

  const [reviewId, setReviewId] = useState(reviews.length);
  const [moreButton, setMoreButton] = useState<HTMLButtonElement | null>(null);
  const [isMoreButtonShown, setIsMoreButtonShown] = useState<boolean>(true);

  const handleMoreButtonClick = () => {
    setReviewId(reviews.length);
  };

  const observer = new IntersectionObserver((entries) => {
    const button = entries[0];

    if (button.isIntersecting) {
      setReviewId(reviews.length);
    }
  }, {
    rootMargin: '0px 0px -50px',
    threshold: 1.0,
  });

  useEffect(() => {
    if (moreButton) {
      observer.observe(moreButton);
    }

    return () =>  {
      if (moreButton) {
        observer.unobserve(moreButton);
      }
    };
  });

  useEffect(() => {
    if (isSuccessStatus && reviewId + REVIEWS_COUNT_PER_STEP >= reviewsTotalCount) {
      setIsMoreButtonShown(false);
    }
  }, [isSuccessStatus, reviewId, reviewsTotalCount]);

  useEffect(() => {
    if (isIdleStatus || isSuccessStatus) {
      dispatch(fetchReviews(productId, reviewId));
    }
  }, [reviewId]);

  if (isSuccessStatus && reviews.length === 0) {
    return (
      <div className="review-list">
        <h4 className="title title--lesser">Отзывы о данном товаре - отсутствуют.</h4>
      </div>
    );
  }

  if (isLoadingStatus && reviews.length === 0) {
    return (
      <div className="review-list">
        <h4 className="title title--lesser">Загрузка...</h4>
      </div>
    );
  }

  if (isFailureStatus) {
    return (
      <div className="review-list">
        <h4 className="title title--lesser">Что-то пошло не так.</h4>
      </div>
    );
  }

  return (
    <>
      <ul className="review-list">
        {reviews.map((review) => {
          const {id, userName, advantage, disadvantage, comment: commentText, rating, createAt} = review;

          return(
            <li key={id} className="review" data-testid="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">{userName}</h4>
                <span className="review__date">
                  {new Date(createAt).toLocaleDateString(APP_LOCALE, {
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
              <Rate
                className="review__rating-panel"
                width="16"
                height="16"
                rating={rating}
              />
              <h5 className="review__title title title--lesser">Достоинства:</h5>
              <p className="review__value">{advantage}</p>
              <h5 className="review__title title title--lesser">Недостатки:</h5>
              <p className="review__value">{disadvantage}</p>
              <h5 className="review__title title title--lesser">Комментарий:</h5>
              <p className="review__value">{commentText}</p>
            </li>
          );
        })}
      </ul>
      {isMoreButtonShown && (
        <button
          onClick={handleMoreButtonClick}
          ref={setMoreButton}
          className={`button button--medium ${addClassModifier(isLoadingStatus, 'reviews__more-button', 'loading')}`}
          disabled={isLoadingStatus}
        >
          {isLoadingStatus ? (
            <svg className="reviews__icon-loader" width="30" height="30" aria-hidden="true">
              <use xlinkHref="#icon-oval-loader" />
            </svg>
          ) : 'Показать еще отзывы'}
        </button>
      )}
    </>
  );
}

export default ReviewList;

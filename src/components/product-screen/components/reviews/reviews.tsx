import {MouseEvent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setReviews, setReviewsStatus, setReviewsTotalCount} from '../../../../store/reviews/reviews-actions';
import {isReviewSuccess} from '../../../../store/reviews/reviews-selectors';
import ReviewList from '../review-list/review-list';
import {ModalReviewAdd, ModalReviewAddSuccess} from '../../../modals/modals';
import {getFocusableElements} from '../../../../utils/utils';
import {StatusType} from '../../../../common/enums';
import {FOCUS_TIMEOUT, TRANSITION_DELAY} from '../../../../common/constants';

type ReviewsProps = {
  productId: number;
  productName: string;
}

function Reviews({productId, productName}: ReviewsProps): JSX.Element {
  const isReviewSuccessStatus = useSelector(isReviewSuccess);

  const [isModalReviewAddOpen, setIsModalReviewAddOpen] = useState(false);
  const [isModalReviewAddSuccessOpen, setIsModalReviewAddSuccessOpen] = useState(false);

  const dispatch = useDispatch();

  const handleReviewAddLinkClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setIsModalReviewAddOpen(true);
  };

  const handleUpButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    const focusableElements = getFocusableElements(document.body);
    const firstElement = focusableElements[0] as HTMLElement;

    firstElement.focus();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (isReviewSuccessStatus) {
      setTimeout(() => {setIsModalReviewAddSuccessOpen(true);}, FOCUS_TIMEOUT + TRANSITION_DELAY);
    }
  }, [isReviewSuccessStatus]);

  useEffect(() => () => {
    dispatch(setReviews([]));
    dispatch(setReviewsTotalCount(0));
    dispatch(setReviewsStatus(StatusType.Idle));
  }, [dispatch, productId]);

  return (
    <>
      <section className="reviews">
        <h3 className="reviews__title title title--bigger">Отзывы</h3>
        <Link
          onClick={handleReviewAddLinkClick}
          to="#"
          className="button button--red-border button--big reviews__submit-button"
        >Оставить отзыв
        </Link>
        <ReviewList productId={productId} />
        <Link
          onClick={handleUpButtonClick}
          to="#header"
          className="button button--up button--red-border button--big reviews__up-button"
        >Наверх
        </Link>
      </section>
      <ModalReviewAdd
        isModalOpen={isModalReviewAddOpen}
        onModalOpenSelect={setIsModalReviewAddOpen}
        productId={productId}
        productName={productName}
      />
      <ModalReviewAddSuccess
        isModalOpen={isModalReviewAddSuccessOpen}
        onModalOpenSelect={setIsModalReviewAddSuccessOpen}
      />
    </>
  );
}

export default Reviews;

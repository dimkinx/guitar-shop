import {MouseEvent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setReviews, setReviewsStatus, setReviewsTotalCount} from '../../../../store/reviews/reviews-actions';
import {isReviewSuccess} from '../../../../store/reviews/reviews-selectors';
import ReviewList from '../review-list/review-list';
import {ModalReviewForm, ModalReviewSuccessMessage} from '../../../modals/modals';
import {getFocusableElements} from '../../../../utils';
import {StatusType} from '../../../../enums';
import {FOCUS_TIMEOUT, TRANSITION_DELAY} from '../../../../constants';

type ReviewsProps = {
  productId: number;
  productName: string;
}

function Reviews({productId, productName}: ReviewsProps): JSX.Element {
  const isReviewSuccessStatus = useSelector(isReviewSuccess);

  const [isModalPostReviewOpen, setIsModalPostReviewOpen] = useState(false);
  const [isModalSuccessReviewOpen, setIsModalSuccessReviewOpen] = useState(false);

  const dispatch = useDispatch();

  const handlePostReviewModalOpen = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setIsModalPostReviewOpen(true);
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
      setTimeout(() => {setIsModalSuccessReviewOpen(true);}, FOCUS_TIMEOUT + TRANSITION_DELAY);
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
          onClick={handlePostReviewModalOpen}
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
      <ModalReviewForm
        isModalOpen={isModalPostReviewOpen}
        onModalOpenSelect={setIsModalPostReviewOpen}
        productId={productId}
        productName={productName}
      />
      <ModalReviewSuccessMessage
        isModalOpen={isModalSuccessReviewOpen}
        onModalOpenSelect={setIsModalSuccessReviewOpen}
      />
    </>
  );
}

export default Reviews;

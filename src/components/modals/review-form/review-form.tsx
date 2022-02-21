import {FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postReview} from '../../../store/reviews/reviews-api-actions';
import Modal from '../modal/modal';
import {ReviewPost} from '../../../types/review';
import {isReviewLoading, isReviewSuccess} from '../../../store/reviews/reviews-selectors';
import {setReviewStatus} from '../../../store/reviews/reviews-actions';
import {StatusType} from '../../../enums';

const getReviewInitialState = (productId: number): ReviewPost => ({
  userName: '',
  advantage: '',
  disadvantage: '',
  comment: '',
  rating: 0,
  guitarId: productId,
});

type ModalPostReviewProps = {
  isModalOpen: boolean;
  onModalOpenSelect: (isOpen: boolean) => void;
  productId: number;
  productName: string;
}

function ReviewForm({isModalOpen, onModalOpenSelect, productId, productName}: ModalPostReviewProps): JSX.Element {
  const isLoadingStatus = useSelector(isReviewLoading);
  const isSuccessStatus = useSelector(isReviewSuccess);

  const [review, setReview] = useState(getReviewInitialState(productId));
  const [isChanged, setIsChanged] = useState(false);

  const dispatch = useDispatch();

  const handleFieldChange = (evt: {target: HTMLInputElement | HTMLTextAreaElement}) => {
    const {name, value} = evt.target;
    setReview({...review, [name]: name === 'rating' ? Number(value) : value});
    setIsChanged(true);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postReview(review));
  };

  useEffect(() => {
    if (isSuccessStatus) {
      onModalOpenSelect(false);
      setIsChanged(false);
      setReview(getReviewInitialState(productId));
    }

    return () => {
      dispatch(setReviewStatus(StatusType.Idle));
    };
  }, [isSuccessStatus]);

  return (
    <Modal
      isModalOpen={isModalOpen}
      onModalOpenSelect={onModalOpenSelect}
      className="modal--review"
    >
      <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
      <h3 className="modal__product-name title title--medium-20 title--uppercase">{productName}</h3>
      <form
        onSubmit={handleFormSubmit}
        className="form-review"
      >
        <div className="form-review__wrapper">
          <div className="form-review__name-wrapper">
            <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
            <input
              onChange={handleFieldChange}
              className="form-review__input"
              id="user-name"
              type="text"
              name="userName"
              value={review.userName}
              autoComplete="off"
              disabled={isLoadingStatus}
              required
            />
            {isChanged && !review.userName && <span className="form-review__warning">Заполните поле</span>}
          </div>
          <div>
            <span className="form-review__label form-review__label--required">Ваша Оценка</span>
            <div className="rate rate--reverse">
              <input
                onChange={handleFieldChange}
                className="visually-hidden"
                type="radio"
                id="star-5"
                name="rating"
                value="5"
                checked={review.rating === 5}
                disabled={isLoadingStatus}
                required
              />
              <label className="rate__label" htmlFor="star-5" title="Отлично" />
              <input
                onChange={handleFieldChange}
                className="visually-hidden"
                type="radio"
                id="star-4"
                name="rating"
                value="4"
                checked={review.rating === 4}
                disabled={isLoadingStatus}
                required
              />
              <label className="rate__label" htmlFor="star-4" title="Хорошо" />
              <input
                onChange={handleFieldChange}
                className="visually-hidden"
                type="radio"
                id="star-3"
                name="rating"
                value="3"
                checked={review.rating === 3}
                disabled={isLoadingStatus}
                required
              />
              <label className="rate__label" htmlFor="star-3" title="Нормально" />
              <input
                onChange={handleFieldChange}
                className="visually-hidden"
                type="radio"
                id="star-2"
                name="rating"
                value="2"
                checked={review.rating === 2}
                disabled={isLoadingStatus}
                required
              />
              <label className="rate__label" htmlFor="star-2" title="Плохо" />
              <input
                onChange={handleFieldChange}
                className="visually-hidden"
                type="radio"
                id="star-1"
                name="rating"
                value="1"
                checked={review.rating === 1}
                disabled={isLoadingStatus}
                required
              />
              <label className="rate__label" htmlFor="star-1" title="Ужасно" />
              <span className="rate__count" />
              {isChanged && review.rating < 1 && <span className="rate__message">Поставьте оценку</span>}
            </div>
          </div>
        </div>
        <label className="form-review__label form-review__label--required" htmlFor="advantage">Достоинства</label>
        <input
          onChange={handleFieldChange}
          className="form-review__input"
          id="advantage"
          type="text"
          name="advantage"
          value={review.advantage}
          autoComplete="off"
          disabled={isLoadingStatus}
          required
        />
        {isChanged && !review.advantage && <span className="form-review__warning">Заполните поле</span>}
        <label className="form-review__label form-review__label--required" htmlFor="disadvantage">Недостатки</label>
        <input
          onChange={handleFieldChange}
          className="form-review__input"
          id="disadvantage"
          type="text"
          name="disadvantage"
          value={review.disadvantage}
          autoComplete="off"
          disabled={isLoadingStatus}
          required
        />
        {isChanged && !review.disadvantage && <span className="form-review__warning">Заполните поле</span>}
        <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
        <textarea
          onChange={handleFieldChange}
          className="form-review__input form-review__input--textarea"
          id="comment"
          rows={10}
          name="comment"
          value={review.comment}
          autoComplete="off"
          disabled={isLoadingStatus}
          required
        />
        {isChanged && !review.comment && <span className="form-review__warning">Заполните поле</span>}
        <button
          className="button button--medium-20 form-review__button"
          type="submit"
          disabled={isLoadingStatus}
        >Отправить отзыв
        </button>
      </form>
    </Modal>
  );
}

export default ReviewForm;

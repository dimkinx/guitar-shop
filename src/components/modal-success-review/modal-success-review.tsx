import Modal from '../modal/modal';

type ModalPostReviewProps = {
  isModalOpen: boolean;
  onModalOpenSelect: (isOpen: boolean) => void;
}

function ModalSuccessReview({isModalOpen, onModalOpenSelect}: ModalPostReviewProps): JSX.Element {
  const handleButtonClick = () => {
    onModalOpenSelect(false);
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      onModalOpenSelect={onModalOpenSelect}
      className="modal--success"
    >
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <p className="modal__message">Спасибо за ваш отзыв!</p>
      <div className="modal__button-container modal__button-container--review">
        <button
          onClick={handleButtonClick}
          className="button button--small modal__button modal__button--review"
        >К покупкам!
        </button>
      </div>
    </Modal>
  );
}

export default ModalSuccessReview;

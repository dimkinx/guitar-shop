import {useHistory} from 'react-router-dom';
import Modal from '../modal/modal';
import {AppRoute, FOCUS_TIMEOUT, TRANSITION_DELAY} from '../../../common/constants';

type CartAddSuccessProps = {
  isModalOpen: boolean;
  onModalOpenSelect: (isOpen: boolean) => void;
}

function CartAddSuccess({isModalOpen, onModalOpenSelect}: CartAddSuccessProps): JSX.Element {
  const history = useHistory();

  const handleGoToCartButtonClick = () => {
    onModalOpenSelect(false);

    setTimeout(() => {
      history.push(AppRoute.CartScreen);
    }, FOCUS_TIMEOUT + TRANSITION_DELAY);
  };

  const handleContinueShoppingButtonClick = () => {
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
      <p className="modal__message">Товар успешно добавлен в корзину</p>
      <div className="modal__button-container modal__button-container--add">
        <button
          onClick={handleGoToCartButtonClick}
          className="button button--small modal__button"
        >Перейти в корзину
        </button>
        <button
          onClick={handleContinueShoppingButtonClick}
          className="button button--black-border button--small modal__button modal__button--right"
        >Продолжить покупки
        </button>
      </div>
    </Modal>
  );
}

export default CartAddSuccess;

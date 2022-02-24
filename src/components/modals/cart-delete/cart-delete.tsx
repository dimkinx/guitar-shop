import {useDispatch} from 'react-redux';
import {deleteProductInCart} from '../../../store/cart/cart-actions';
import Modal from '../modal/modal';
import {ProductInCart} from '../../../types/product';
import {GuitarType} from '../../../common/enums';
import {GuitarTypeToTranslationMap} from '../../../common/collections';
import {APP_LOCALE} from '../../../common/constants';

type CartDeleteProps = {
  isModalOpen: boolean;
  onModalOpenSelect: (isOpen: boolean) => void;
  product: ProductInCart | null;
}

function CartDelete({isModalOpen, onModalOpenSelect, product}: CartDeleteProps): JSX.Element {
  const dispatch = useDispatch();

  const handleDeleteButtonClick = () => {
    product && dispatch(deleteProductInCart(product.id));
    onModalOpenSelect(false);
  };

  const handleContinueButtonClick = () => {
    onModalOpenSelect(false);
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      onModalOpenSelect={onModalOpenSelect}
    >
      <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
      {product && (
        <div className="modal__info">
          <img
            className="modal__img"
            src={product.previewImg}
            width="67"
            height="137"
            alt={product.name}
          />
          <div className="modal__info-wrapper">
            <h3 className="modal__product-name title title--little title--uppercase">{`Гитара ${product.name}`}</h3>
            <p className="modal__product-params modal__product-params--margin-11">
              Артикул: {product.vendorCode}
            </p>
            <p className="modal__product-params">
              {`${GuitarTypeToTranslationMap.get(product.type as GuitarType)} ${product.stringCount} струнная`}
            </p>
            <p className="modal__price-wrapper">
              <span className="modal__price">Цена:</span>
              <span className="modal__price">{`${product.price.toLocaleString(APP_LOCALE)} ₽`}</span>
            </p>
          </div>
        </div>
      )}
      <div className="modal__button-container">
        <button
          onClick={handleDeleteButtonClick}
          className="button button--small modal__button"
        >Удалить товар
        </button>
        <button
          onClick={handleContinueButtonClick}
          className="button button--black-border button--small modal__button modal__button--right"
        >Продолжить покупки
        </button>
      </div>
    </Modal>
  );
}

export default CartDelete;

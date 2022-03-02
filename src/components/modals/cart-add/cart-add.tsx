import {useDispatch, useSelector} from 'react-redux';
import Modal from '../modal/modal';
import {createProductInCart, updateProductCountInCart} from '../../../store/cart/cart-actions';
import {getProductInCart} from '../../../store/cart/cart-selectors';
import {Product} from '../../../types/product';
import {GuitarType} from '../../../common/enums';
import {GuitarTypeToTranslationMap} from '../../../common/collections';
import {APP_LOCALE} from '../../../common/constants';

type CartAddProps = {
  isModalOpen: boolean;
  onModalOpenSelect: (isOpen: boolean) => void;
  onAddToCartButtonClick: (isProductAddedToCart: boolean) => void;
  product: Product | null;
}

function CartAdd({isModalOpen, onModalOpenSelect, onAddToCartButtonClick, product}: CartAddProps): JSX.Element {
  const productInCart = useSelector(getProductInCart(product ? product.id : 0));
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    if (product) {
      productInCart
        ? dispatch(updateProductCountInCart(product.id, productInCart.count + 1))
        : dispatch(createProductInCart(product));
    }

    onAddToCartButtonClick(true);
    onModalOpenSelect(false);
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      onModalOpenSelect={onModalOpenSelect}
    >
      <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
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
          onClick={handleButtonClick}
          className="button button--red button--big modal__button modal__button--add"
        >Добавить в корзину
        </button>
      </div>
    </Modal>
  );
}

export default CartAdd;

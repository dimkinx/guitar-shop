import {FormEvent, KeyboardEvent, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateProductCountInCart} from '../../../../store/cart/cart-actions';
import {ProductInCart} from '../../../../types/product';
import {GuitarType} from '../../../../common/enums';
import {GuitarTypeToTranslationMap} from '../../../../common/collections';
import {APP_LOCALE, ProductInCartCountRange} from '../../../../common/constants';

type CartItemProps = {
  onModalCartDeleteOpenClick: (isModalCartAddOpen: boolean) => void;
  onCurrentProductSelect: (currentProduct: ProductInCart) => void;
  product: ProductInCart;
}

function CartItem({onModalCartDeleteOpenClick, onCurrentProductSelect, product}: CartItemProps): JSX.Element {
  const {id, name, previewImg, type, vendorCode, stringCount, price, count} = product;

  const [validCount, setValidCount] = useState<number>(count);
  const [isIncrementButtonDisabled, setIsIncrementButtonDisabled] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleDeleteButtonClick = () => {
    onModalCartDeleteOpenClick(true);
    onCurrentProductSelect(product);
  };

  const handleDecrementButtonClick = () => {
    if (count === ProductInCartCountRange.Min) {
      onModalCartDeleteOpenClick(true);
      onCurrentProductSelect(product);

      return;
    }

    dispatch(updateProductCountInCart(id, count - 1));
    setValidCount(count - 1);
  };

  const handleIncrementButtonClick = () => {
    setIsIncrementButtonDisabled(false);
    dispatch(updateProductCountInCart(id, count + 1));
    setValidCount(count + 1);
  };

  const handleOnlyNumberKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (!/\d/.test(evt.key)) {
      evt.preventDefault();
    }
  };

  const handleCountInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const currentCount = Number(evt.currentTarget.value);

    if (currentCount >= ProductInCartCountRange.Min && currentCount <= ProductInCartCountRange.Max) {
      setValidCount(currentCount);
    }

    if (currentCount < ProductInCartCountRange.Min) {
      setValidCount(ProductInCartCountRange.Min);
    }

    if (currentCount > ProductInCartCountRange.Max) {
      setValidCount(ProductInCartCountRange.Max);
    }
  };

  const handleCountInputBlur = () => {
    dispatch(updateProductCountInCart(id, validCount));
  };

  useEffect(() => {
    (count === ProductInCartCountRange.Max)
      ? setIsIncrementButtonDisabled(true)
      : setIsIncrementButtonDisabled(false);
  }, [count]);

  return (
    <div className="cart-item">
      <button
        onClick={handleDeleteButtonClick}
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
      >
        <span className="button-cross__icon" />
        <span className="cart-item__close-button-interactive-area" />
      </button>
      <div className="cart-item__image">
        <img
          src={previewImg}
          width="55"
          height="130"
          alt={name}
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">
          {name}
        </p>
        <p className="product-info__info">
          {`Артикул: ${vendorCode}`}
        </p>
        <p className="product-info__info">
          {`${GuitarTypeToTranslationMap.get(type as GuitarType)} ${stringCount} струнная`}
        </p>
      </div>
      <div className="cart-item__price">
        {`${price.toLocaleString(APP_LOCALE)} ₽`}
      </div>
      <div className="quantity cart-item__quantity">
        <button
          onClick={handleDecrementButtonClick}
          className="quantity__button"
          aria-label="Уменьшить количество"
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus" />
          </svg>
        </button>
        <input
          onKeyPress={handleOnlyNumberKeyPress}
          onChange={handleCountInputChange}
          onBlur={handleCountInputBlur}
          value={validCount}
          className="quantity__input"
          type="number"
          placeholder={String(count)}
          id="2-count"
          name="2-count"
          min={ProductInCartCountRange.Min}
          max={ProductInCartCountRange.Max}
        />
        <button
          onClick={handleIncrementButtonClick}
          className="quantity__button"
          aria-label="Увеличить количество"
          disabled={isIncrementButtonDisabled}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus" />
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">
        {`${(price * count).toLocaleString(APP_LOCALE)} ₽`}
      </div>
    </div>
  );
}

export default CartItem;

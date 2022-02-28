import {FormEvent, KeyboardEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postCoupon} from '../../../../store/cart/cart-api-actions';
import {getCoupon, isCouponInvalid, isCouponLoading, isCouponValid} from '../../../../store/cart/cart-selectors';
import {setCoupon} from '../../../../store/cart/cart-actions';

function CartCoupon(): JSX.Element {
  const couponValue = useSelector(getCoupon);
  const isLoadingStatus = useSelector(isCouponLoading);
  const isCouponValidStatus = useSelector(isCouponValid);
  const isCouponInvalidStatus = useSelector(isCouponInvalid);

  const dispatch = useDispatch();

  const handlePreventSpaceKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (/\s/.test(evt.key)) {
      evt.preventDefault();
    }
  };

  const handleCouponInputChange = (evt: FormEvent<HTMLInputElement>) => {
    dispatch(setCoupon(evt.currentTarget.value.replace(/\s/g, '')));
  };

  const handleSubmitButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(postCoupon(couponValue));
  };

  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form className="coupon__form" id="coupon-form" method="post" action="/">
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input
            onKeyPress={handlePreventSpaceKeyPress}
            onChange={handleCouponInputChange}
            type="text"
            placeholder="Введите промокод"
            id="coupon"
            name="coupon"
            value={couponValue}
            readOnly={isLoadingStatus}
          />
          {isCouponValidStatus && <p className="form-input__message form-input__message--success">Промокод принят</p>}
          {isCouponInvalidStatus && <p className="form-input__message form-input__message--error">Неверный промокод</p>}
        </div>
        <button
          onClick={handleSubmitButtonClick}
          className="button button--big coupon__button"
          disabled={isLoadingStatus}
        >
          {isLoadingStatus
            ? (
              <svg className="coupon__icon-loader" width="30" height="30" aria-hidden="true">
                <use xlinkHref="#icon-oval-loader" />
              </svg>
            )
            : 'Применить'}
        </button>
      </form>
    </div>
  );
}

export default CartCoupon;

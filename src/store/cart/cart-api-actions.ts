import {toast} from 'react-toastify';
import {ThunkActionResult} from '../../types/thunk-action';
import {setCouponPostStatus, setCouponValidityStatus, setDiscount} from './cart-actions';
import {Coupon, Discount} from '../../types/coupon';
import {CouponValidityType, StatusType} from '../../common/enums';
import {APIRoute, ErrorMessage} from '../../common/constants';

const postCoupon = (couponValue: Coupon): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setCouponPostStatus(StatusType.Loading));
    await api.post<Discount>(APIRoute.PostCoupon(), {coupon: couponValue})
      .then(({data}) => {
        dispatch(setDiscount(data));
        dispatch(setCouponValidityStatus(CouponValidityType.Valid));
        dispatch(setCouponPostStatus(StatusType.Success));
      })
      .catch(({response}) => {
        dispatch(setCouponPostStatus(StatusType.Failure));
        if (response && response.status === 400) {
          dispatch(setCouponValidityStatus(CouponValidityType.Invalid));
          dispatch(setDiscount(0));
        } else {
          toast.error(ErrorMessage.FailedToPostCouponRequest);
        }
      });
  }
);

export {postCoupon};

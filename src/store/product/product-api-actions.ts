import {toast} from 'react-toastify';
import {ThunkActionResult} from '../../types/thunk-action';
import {setProduct, setProductStatus} from './product-actions';
import {StatusType} from '../../enums';
import {Product} from '../../types/product';
import {APIRoute, ErrorMessage} from '../../constants';

const fetchProduct = (productId: number): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setProductStatus(StatusType.Loading));
    await api.get<Product>(APIRoute.GetProduct(productId))
      .then(({data}) => {
        dispatch(setProduct(data));
        dispatch(setProductStatus(StatusType.Success));
      })
      .catch(({response}) => {
        dispatch(setProductStatus(response && response.status === 404 ? StatusType.NotFound : StatusType.Failure));
        !response && toast.error(ErrorMessage.FailedToLoadProduct);
      });
  }
);

export {fetchProduct};

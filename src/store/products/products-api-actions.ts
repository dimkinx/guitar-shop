// import {toast} from 'react-toastify';
import {ThunkActionResult} from '../../types/thunk-action';
import {setProducts, setProductsStatus} from './products-actions';
import {StatusType} from '../../enums';
import {Product} from '../../types/product';
import {APIRoute} from '../../constants';
import {QueryParams} from '../../types/query-params';

const fetchProducts = (queryParams?: QueryParams): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setProductsStatus(StatusType.Loading));
    await api.get<Product[]>(APIRoute.Products, {params: queryParams})
      .then(({data}) => {
        dispatch(setProducts(data));
        dispatch(setProductsStatus(StatusType.Success));
      })
      .catch(() => {
        dispatch(setProductsStatus(StatusType.Failure));
        // toast.error(ErrorMessage.FailToLoadOffers);
      });
  }
);

export {fetchProducts};

import {toast} from 'react-toastify';
import {ThunkActionResult} from '../../types/thunk-action';
import {setFoundProducts, setFoundProductsStatus} from './search-actions';
import {StatusType} from '../../enums';
import {Product} from '../../types/product';
import {APIRoute, ErrorMessage} from '../../constants';
import {QueryParams} from '../../types/query-params';

const fetchFoundProducts = (queryParams?: QueryParams): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setFoundProductsStatus(StatusType.Loading));
    await api.get<Product[]>(APIRoute.Products, {params: queryParams})
      .then(({data}) => {
        dispatch(setFoundProducts(data));
        dispatch(setFoundProductsStatus(StatusType.Success));
      })
      .catch(() => {
        dispatch(setFoundProductsStatus(StatusType.Failure));
        toast.error(ErrorMessage.FailedToLoadSearchRequest);
      });
  }
);

export {fetchFoundProducts};

import {toast} from 'react-toastify';
import {ThunkActionResult} from '../../types/thunk-action';
import {setFoundProducts, setFoundProductsStatus} from './search-actions';
import {Product} from '../../types/product';
import {StatusType} from '../../common/enums';
import {APIRoute, ErrorMessage} from '../../common/constants';

const fetchFoundProducts = (searchParams: URLSearchParams): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setFoundProductsStatus(StatusType.Loading));
    await api.get<Product[]>(APIRoute.GetProducts(), {params: searchParams})
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

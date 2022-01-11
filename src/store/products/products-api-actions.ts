import {toast} from 'react-toastify';
import {ThunkActionResult} from '../../types/thunk-action';
import {setProducts, setProductsStatus, setProductsTotalCount} from './products-actions';
import {StatusType} from '../../enums';
import {Product} from '../../types/product';
import {APIRoute, Namespace, ErrorMessage, SearchParamPostfix, RESPONSE_HEADER_X_TOTAL_COUNT} from '../../constants';
import {mergeSearchParams} from '../../utils';

const fetchProducts = (searchParams: URLSearchParams): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setProductsStatus(StatusType.Loading));
    await api.get<Product[]>(APIRoute.Products, {params:
        mergeSearchParams(new URLSearchParams({
          [SearchParamPostfix.Embed]: Namespace.Comments,
        }), searchParams),
    })
      .then(({data, headers}) => {
        dispatch(setProducts(data));
        dispatch(setProductsTotalCount(Number(headers[RESPONSE_HEADER_X_TOTAL_COUNT])));
        dispatch(setProductsStatus(StatusType.Success));
      })
      .catch(() => {
        dispatch(setProductsStatus(StatusType.Failure));
        toast.error(ErrorMessage.FailedToLoadProducts);
      });
  }
);

export {fetchProducts};

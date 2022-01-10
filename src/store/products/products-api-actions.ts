import {toast} from 'react-toastify';
import {ThunkActionResult} from '../../types/thunk-action';
import {setProducts, setProductsStatus} from './products-actions';
import {StatusType} from '../../enums';
import {Product} from '../../types/product';
import {APIRoute, Namespace, NUM_PRODUCTS_PER_PAGE, ErrorMessage, SearchParamPostfix} from '../../constants';
import {mergeSearchParams} from '../../utils';

const fetchProducts = (searchParams: URLSearchParams): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setProductsStatus(StatusType.Loading));
    await api.get<Product[]>(APIRoute.Products, {params:
        mergeSearchParams(new URLSearchParams({
          [SearchParamPostfix.Embed]: Namespace.Comments,
          [SearchParamPostfix.Start]: '0',
          [SearchParamPostfix.Limit]: NUM_PRODUCTS_PER_PAGE.toString(),
        }), searchParams),
    })
      .then(({data}) => {
        dispatch(setProducts(data));
        dispatch(setProductsStatus(StatusType.Success));
      })
      .catch(() => {
        dispatch(setProductsStatus(StatusType.Failure));
        toast.error(ErrorMessage.FailedToLoadProducts);
      });
  }
);

export {fetchProducts};

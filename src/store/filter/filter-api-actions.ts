import {toast} from 'react-toastify';
import {ThunkActionResult} from '../../types/thunk-action';
import {setPriceRangeMin, setPriceRangeMax, setPriceRangeStatus} from './filter-actions';
import {OrderType, SortType, StatusType} from '../../enums';
import {Product} from '../../types/product';
import {APIRoute, ErrorMessage, SearchParamPostfix} from '../../constants';
import {mergeSearchParams} from '../../utils';

const fetchPriceRange = (searchParams: URLSearchParams): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setPriceRangeStatus(StatusType.Loading));
    await Promise.all([
      api.get<Product[]>(APIRoute.Products, {
        params: mergeSearchParams(new URLSearchParams({
          [SearchParamPostfix.Sort]: SortType.Price,
          [SearchParamPostfix.Order]: OrderType.Ascending,
          [SearchParamPostfix.Limit]: '1',
        }), searchParams),
      }),
      api.get<Product[]>(APIRoute.Products, {
        params: mergeSearchParams(new URLSearchParams({
          [SearchParamPostfix.Sort]: SortType.Price,
          [SearchParamPostfix.Order]: OrderType.Descending,
          [SearchParamPostfix.Limit]: '1',
        }), searchParams),
      }),
    ])
      .then(([{data: [{price: priceRangeMin}]}, {data: [{price: priceRangeMax}]}]) => {
        dispatch(setPriceRangeMin(priceRangeMin));
        dispatch(setPriceRangeMax(priceRangeMax));
        dispatch(setPriceRangeStatus(StatusType.Success));
      })
      .catch(() => {
        dispatch(setPriceRangeStatus(StatusType.Failure));
        toast.error(ErrorMessage.FailedToLoadPriceRangeRequest);
      });
  }
);

export {fetchPriceRange};

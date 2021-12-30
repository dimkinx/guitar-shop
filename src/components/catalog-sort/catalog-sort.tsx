import {useEffect, useState} from 'react';
import {SortType, OrderType, StatusType} from '../../enums';
import {fetchProducts} from '../../store/products/products-api-actions';
import {Namespace, NUM_PRODUCTS_PER_PAGE, QueryParam} from '../../constants';
import {setProductsStatus} from '../../store/products/products-actions';
import {useDispatch} from 'react-redux';

function CatalogSort(): JSX.Element {
  const [sortType, setSortType] = useState('');
  const [orderType, setOrderType] = useState('');

  const dispatch = useDispatch();

  const handlePriceButtonClick = () => {
    if (sortType !== SortType.Price) {
      setSortType(SortType.Price);
    }
    if (!orderType) {
      setOrderType(OrderType.Ascending);
    }
  };

  const handleRatingButtonClick = () => {
    if (sortType !== SortType.Rating) {
      setSortType(SortType.Rating);
    }
    if (!orderType) {
      setOrderType(OrderType.Ascending);
    }
  };

  const handleAscendingButtonClick = () => {
    if (orderType !== OrderType.Ascending) {
      setOrderType(OrderType.Ascending);
    }
    if (!sortType) {
      setSortType(SortType.Price);
    }
  };

  const handleDescendingButtonClick = () => {
    if (orderType !== OrderType.Descending) {
      setOrderType(OrderType.Descending);
    }
    if (!sortType) {
      setSortType(SortType.Price);
    }
  };

  useEffect(() => {
    if (sortType && orderType) {
      dispatch(fetchProducts({
        [QueryParam.Sort]: sortType,
        [QueryParam.Order]: orderType,
        [QueryParam.Embed]: Namespace.Comments,
        [QueryParam.Start]: 0,
        [QueryParam.Limit]: NUM_PRODUCTS_PER_PAGE,
      }));
    }

    return () => {
      dispatch(setProductsStatus(StatusType.Idle));
    };
  }, [dispatch, orderType, sortType]);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          onClick={handlePriceButtonClick}
          className={`catalog-sort__type-button ${sortType === SortType.Price ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={sortType === SortType.Price ? -1 : undefined}
        >по цене
        </button>
        <button
          onClick={handleRatingButtonClick}
          className={`catalog-sort__type-button ${sortType === SortType.Rating ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          tabIndex={sortType === SortType.Rating ? -1 : undefined}
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          onClick={handleAscendingButtonClick}
          className={`catalog-sort__order-button catalog-sort__order-button--up ${orderType === OrderType.Ascending ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={orderType === OrderType.Ascending ? -1 : undefined}
        />
        <button
          onClick={handleDescendingButtonClick}
          className={`catalog-sort__order-button catalog-sort__order-button--down ${orderType === OrderType.Descending ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          tabIndex={orderType === OrderType.Descending ? -1 : undefined}
        />
      </div>
    </div>
  );
}

export default CatalogSort;

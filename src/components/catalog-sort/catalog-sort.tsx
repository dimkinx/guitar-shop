import {MouseEvent, useEffect, useState} from 'react';
import {SortType, OrderType, StatusType} from '../../enums';
import {fetchProducts} from '../../store/products/products-api-actions';
import {Namespace, NUM_PRODUCTS_PER_PAGE, QueryParam} from '../../constants';
import {setProductsStatus} from '../../store/products/products-actions';
import {useDispatch} from 'react-redux';
import {addClassModifier} from '../../utils';

function CatalogSort(): JSX.Element {
  const [sortType, setSortType] = useState('');
  const [orderType, setOrderType] = useState('');

  const dispatch = useDispatch();

  const handleSortButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    setSortType(evt.currentTarget.dataset.sort as SortType);

    if (!orderType) {
      setOrderType(OrderType.Ascending);
    }
  };

  const handleOrderButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    setOrderType(evt.currentTarget.dataset.order as OrderType);

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
          onClick={handleSortButtonClick}
          className={addClassModifier(sortType === SortType.Price, 'catalog-sort__type-button')}
          aria-label="по цене"
          tabIndex={sortType === SortType.Price ? -1 : undefined}
          data-sort={SortType.Price}
        >по цене
        </button>
        <button
          onClick={handleSortButtonClick}
          className={addClassModifier(sortType === SortType.Rating, 'catalog-sort__type-button')}
          aria-label="по популярности"
          tabIndex={sortType === SortType.Rating ? -1 : undefined}
          data-sort={SortType.Rating}
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          onClick={handleOrderButtonClick}
          className={`${addClassModifier(orderType === OrderType.Ascending, 'catalog-sort__order-button')} catalog-sort__order-button--up`}
          aria-label="По возрастанию"
          tabIndex={orderType === OrderType.Ascending ? -1 : undefined}
          data-order={OrderType.Ascending}
        />
        <button
          onClick={handleOrderButtonClick}
          className={`${addClassModifier(orderType === OrderType.Descending, 'catalog-sort__order-button')} catalog-sort__order-button--down`}
          aria-label="По убыванию"
          tabIndex={orderType === OrderType.Descending ? -1 : undefined}
          data-order={OrderType.Descending}
        />
      </div>
    </div>
  );
}

export default CatalogSort;

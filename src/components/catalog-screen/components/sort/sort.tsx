import {MouseEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setOrderType, setSortType} from '../../../../store/sort/sort-actions';
import {getOrderType, getSortType} from '../../../../store/sort/sort-selectors';
import {addClassModifier} from '../../../../utils/utils';
import {SortType, OrderType} from '../../../../common/enums';

function Sort(): JSX.Element {
  const sortType = useSelector(getSortType);
  const orderType = useSelector(getOrderType);

  const dispatch = useDispatch();

  const handleSortButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    dispatch(setSortType(evt.currentTarget.dataset.sort as SortType));

    if (!orderType) {
      dispatch(setOrderType(OrderType.Ascending));
    }
  };

  const handleOrderButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    dispatch(setOrderType(evt.currentTarget.dataset.order as OrderType));

    if (!sortType) {
      dispatch(setSortType(SortType.Price));
    }
  };

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

export default Sort;

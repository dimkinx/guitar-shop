import {useEffect} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts, isProductsFailure, isProductsLoading, isProductsSuccess} from '../../../../store/products/products-selectors';
import {getOrderType, getSortType} from '../../../../store/sort/sort-selectors';
import {fetchProducts} from '../../../../store/products/products-api-actions';
import Card from '../card/card';
import {ReactComponent as ProductCardSkeleton} from '../../../../assets/skeleton-card.svg';
import {createIndexList} from '../../../../utils';
import {PRODUCTS_COUNT_PER_PAGE, SearchParamPostfix} from '../../../../constants';

function Cards(): JSX.Element {
  const {pageId} = useParams<{pageId: string}>();
  const cardIndex = pageId ? (parseInt(pageId, 10) - 1) * PRODUCTS_COUNT_PER_PAGE : 0;

  const location = useLocation();
  const dispatch = useDispatch();

  const products = useSelector(getProducts);
  const isLoading = useSelector(isProductsLoading);
  const isFailure = useSelector(isProductsFailure);
  const isSuccess = useSelector(isProductsSuccess);
  const sortType = useSelector(getSortType);
  const orderType = useSelector(getOrderType);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.append(SearchParamPostfix.Start, cardIndex.toString());
    searchParams.append(SearchParamPostfix.Limit, PRODUCTS_COUNT_PER_PAGE.toString());
    sortType && searchParams.append(SearchParamPostfix.Sort, sortType);
    orderType && searchParams.append(SearchParamPostfix.Order, orderType);

    dispatch(fetchProducts(searchParams));
  }, [dispatch, cardIndex, location.search, orderType, sortType]);

  return (
    <>
      {(isLoading || isFailure) && (
        <div className="cards catalog__cards" data-testid="loading-cards">
          {createIndexList(PRODUCTS_COUNT_PER_PAGE)
            .map((index) => (
              <ProductCardSkeleton
                key={index}
              />
            ))}
        </div>
      )}
      {isSuccess && products.length > 0 &&  (
        <div className="cards catalog__cards" data-testid="success-cards">
          {isSuccess && products.map((product) => (
            <Card
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
      {isSuccess && products.length === 0 && (
        <div className="empty catalog__empty">
          <h3>Запрашиваемые товары не найдены</h3>
        </div>
      )}
    </>
  );
}

export default Cards;

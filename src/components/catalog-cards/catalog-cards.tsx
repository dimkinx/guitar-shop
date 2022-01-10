import {createIndexList} from '../../utils';
import {NUM_PRODUCTS_PER_PAGE, SearchParamPostfix} from '../../constants';
import {ReactComponent as ProductCardSkeleton} from '../../assets/skeleton-card.svg';
import ProductCard from '../product-card/product-card';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts, isProductsFailure, isProductsLoading, isProductsSuccess} from '../../store/products/products-selectors';
import {getOrderType, getSortType} from '../../store/sort/sort-selectors';
import {useEffect} from 'react';
import {fetchProducts} from '../../store/products/products-api-actions';
import {useLocation} from 'react-router-dom';

function CatalogCards(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  const products = useSelector(getProducts);
  const isLoading = useSelector(isProductsLoading);
  const isFailure = useSelector(isProductsFailure);
  const isSuccess = useSelector(isProductsSuccess);
  const sortType = useSelector(getSortType);
  const orderType = useSelector(getOrderType);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    sortType && searchParams.append(SearchParamPostfix.Sort, sortType);
    orderType && searchParams.append(SearchParamPostfix.Order, orderType);

    dispatch(fetchProducts(searchParams));
  }, [dispatch, location.search, orderType, sortType]);

  return (
    <div className="cards catalog__cards">
      {(isLoading || isFailure) && (
        createIndexList(NUM_PRODUCTS_PER_PAGE)
          .map((index) => (
            <ProductCardSkeleton
              key={index}
            />
          ))
      )}
      {isSuccess && products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default CatalogCards;

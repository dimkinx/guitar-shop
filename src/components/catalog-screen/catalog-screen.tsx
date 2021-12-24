import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import ProductCard from '../product-card/product-card';
import {ReactComponent as ProductCardSkeleton} from '../../assets/skeleton-card.svg';
import Pagination from '../pagination/pagination';
import Footer from '../footer/footer';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts, getProductsStatus} from '../../store/products/products-selectors';
import {useEffect} from 'react';
import {fetchProducts} from '../../store/products/products-api-actions';
import {setProductsStatus} from '../../store/products/products-actions';
import {StatusType} from '../../enums';
import {Namespace, NUM_PRODUCTS_PER_PAGE, QueryParam} from '../../constants';
import {createIndexList} from '../../utils';

function CatalogScreen(): JSX.Element {
  const products = useSelector(getProducts);
  const productsStatus = useSelector(getProductsStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({
      [QueryParam.Embed]: Namespace.Comments,
      [QueryParam.Start]: 0,
      [QueryParam.Limit]: NUM_PRODUCTS_PER_PAGE,
    }));

    return () => {
      dispatch(setProductsStatus(StatusType.Idle));
    };
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort />
            <div className="cards catalog__cards">
              {productsStatus === StatusType.Loading && createIndexList(NUM_PRODUCTS_PER_PAGE).map((index) => (
                <ProductCardSkeleton key={index} />
              ))}
              {productsStatus === StatusType.Success && products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogScreen;

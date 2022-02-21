import {useEffect} from 'react';
import {Link, useLocation, useParams} from 'react-router-dom';
import {AppRoute} from '../../../constants';

type BreadcrumbsProps = {
  productName?: string;
}

function Breadcrumbs({productName}: BreadcrumbsProps): JSX.Element {
  const location = useLocation();
  const {pageId} = useParams<{pageId: string}>();

  const isCatalogScreenRoute = location.pathname === AppRoute.CatalogScreen
    || location.pathname === `${AppRoute.CatalogScreenPrefix}_${pageId}`;
  const isProductScreenRoute = location.pathname.startsWith(AppRoute.ProductScreenPrefix);
  const isCartScreenRoute = location.pathname === AppRoute.CartScreen;

  useEffect(() => {
    if (isCatalogScreenRoute) {
      document.title = 'Каталог гитар — Guitar-shop';
    }
    if (isProductScreenRoute) {
      document.title = `${productName} — Guitar-shop`;
    }
    if (isCartScreenRoute) {
      document.title = 'Корзина — Guitar-shop';
    }

    return () => {
      document.title = 'Guitar-shop';
    };
  });

  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link to={AppRoute.MainScreen} className="link">Главная</Link>
      </li>
      <li className="breadcrumbs__item">
        <Link to={AppRoute.CatalogScreen} className="link">Каталог</Link>
      </li>
      {isProductScreenRoute && (
        <li className="breadcrumbs__item">
          {productName}
        </li>
      )}
      {isCartScreenRoute && (
        <li className="breadcrumbs__item">
          Корзина
        </li>
      )}
    </ul>
  );
}

export default Breadcrumbs;

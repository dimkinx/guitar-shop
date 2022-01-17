import {Link, useLocation, useParams} from 'react-router-dom';
import {AppRoute} from '../../constants';

function Breadcrumbs(): JSX.Element {
  const location = useLocation();
  const {pageId} = useParams<{pageId: string}>();
  const isCatalogScreenRoute = location.pathname === AppRoute.CatalogScreen
    || location.pathname === `${AppRoute.CatalogPaginationPrefix}_${pageId}`;

  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link
          className="link"
          to={AppRoute.MainScreen}
        >Главная
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <Link
          className="link"
          style={{pointerEvents: `${isCatalogScreenRoute ? 'none' : 'auto'}`}}
          to={AppRoute.CatalogScreen}
        >Каталог
        </Link>
      </li>
    </ul>
  );
}

export default Breadcrumbs;

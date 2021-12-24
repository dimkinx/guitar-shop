import {Link, useLocation} from 'react-router-dom';
import {AppRoute} from '../../constants';

function Breadcrumbs(): JSX.Element {
  const location = useLocation();
  const isCatalogScreenRoute = location.pathname === AppRoute.CatalogScreen;

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

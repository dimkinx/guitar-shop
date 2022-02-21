import {NavLink, Link} from 'react-router-dom';
import Logo from '../logo/logo';
import SearchForm from '../search-form/search-form';
import {AppRoute} from '../../../constants';

function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Logo />
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <NavLink
                to={AppRoute.CatalogScreen}
                className="link main-nav__link"
                activeClassName="link--current"
              >Каталог
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#"
                className="link main-nav__link"
              >Где купить?
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#"
                className="link main-nav__link"
              >О компании
              </NavLink>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <Link
          to={AppRoute.CartScreen}
          className="header__cart-link"
          aria-label="Корзина"
        >
          <svg
            className="header__cart-icon"
            width="14"
            height="14"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-basket" />
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;

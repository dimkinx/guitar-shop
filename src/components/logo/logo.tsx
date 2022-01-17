import {MouseEvent} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {AppRoute} from '../../constants';

type LogoProps = {
  className?: string;
}

function Logo({className = 'header'}: LogoProps): JSX.Element {
  const location = useLocation();
  const isMainScreenRoute = location.pathname === AppRoute.MainScreen;

  const handleLinkClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    if (isMainScreenRoute) {
      evt.preventDefault();
    }
  };

  return (
    <Link
      onClick={handleLinkClick}
      className={`${className}__logo logo`}
      style={{pointerEvents: `${isMainScreenRoute ? 'none' : 'auto'}`}}
      to={AppRoute.MainScreen}
    >
      <img
        className="logo__img"
        width="70"
        height="70"
        src="./img/svg/logo.svg"
        alt="Логотип"
      />
    </Link>
  );
}

export default Logo;

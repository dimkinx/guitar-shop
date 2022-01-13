import {Link, useLocation} from 'react-router-dom';
import {AppRoute} from '../../constants';
import './style.css';

function NotFoundScreen(): JSX.Element {
  const location = useLocation();

  return (
    <div className="wrapper-404">
      <h1 className="title-404" data-text="404">404</h1>
      <p className="description-404">
        Информация по адресу <b>{location.pathname}</b> - не найдена!
      </p>
      <p className="description-404">
        Вы можете вернуться на <Link to={AppRoute.MainScreen} className="description-404__link">главную страницу</Link>.
      </p>
    </div>
  );
}

export default NotFoundScreen;

import {Link} from 'react-router-dom';
import {Rate} from '../../../shared/shared';
import {APP_LOCALE, AppRoute} from '../../../../constants';
import {Product} from '../../../../types/product';

type ProductCardProps = {
  product: Product;
}

function Card({product}: ProductCardProps): JSX.Element {
  const {id, name, previewImg, rating, price, comments} = product;

  return (
    <div className="product-card">
      <img
        src={previewImg}
        width="75"
        height="190"
        alt={name}
      />
      <div className="product-card__info">
        <Rate
          className="product-card__rate"
          width="12"
          height="11"
          rating={rating}
        >{comments && <span className="rate__count">{comments.length}</span>}
        </Rate>
        <p className="product-card__title">
          {name}
        </p>
        <p className="product-card__price" data-testid="price">
          <span className="visually-hidden">Цена:</span>
          {`${price.toLocaleString(APP_LOCALE)} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link to={`${AppRoute.ProductScreenPrefix}${id}`} className="button button--mini">Подробнее</Link>
        <Link to="#" className="button button--red button--mini button--add-to-cart">Купить</Link>
      </div>
    </div>
  );
}

export default Card;

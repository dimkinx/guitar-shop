import {MAX_STARS_COUNT} from '../../constants';
import {createIndexList} from '../../utils';
import {Product} from '../../types/product';

type ProductCardProps = {
  product: Product;
}

function ProductCard({product}: ProductCardProps): JSX.Element {
  const {name, previewImg, rating, price, comments} = product;

  return (
    <div className="product-card">
      <img
        src={previewImg}
        width="75"
        height="190"
        alt={name}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className='visually-hidden'>Рейтинг:</span>
          {createIndexList(MAX_STARS_COUNT).map((index) => (
            <svg key={`${index}-star`} width="12" height="11" aria-hidden="true">
              <use xlinkHref={`#${(Math.round(rating) > index) ? 'icon-full-star' : 'icon-star'}`} />
            </svg>
          ))}
          {comments && <span className="rate__count">{comments?.length}</span>}
          <span className="rate__message" />
        </div>
        <p className="product-card__title">
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {`${price.toLocaleString('ru-RU')} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="button button--mini">Подробнее</button>
        <button className="button button--red button--mini button--add-to-cart">Купить</button>
      </div>
    </div>
  );
}

export default ProductCard;

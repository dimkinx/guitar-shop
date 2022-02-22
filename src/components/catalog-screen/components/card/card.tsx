import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {isProductAdded} from '../../../../store/cart/cart-selectors';
import {Rate} from '../../../shared/shared';
import {Product} from '../../../../types/product';
import {APP_LOCALE, AppRoute} from '../../../../common/constants';

type ProductCardProps = {
  product: Product;
  onModalCartAddOpenClick: (isModalCartAddOpen: boolean) => void;
  onCurrentProductSelect: (currentProduct: Product) => void;
}

function Card({product, onModalCartAddOpenClick, onCurrentProductSelect}: ProductCardProps): JSX.Element {
  const {id, name, previewImg, rating, price, comments} = product;
  const isProductAddedToCart = useSelector(isProductAdded(id));

  const handleAddToCartLinkClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    if (!isProductAddedToCart) {
      evt.preventDefault();

      onModalCartAddOpenClick(true);
      onCurrentProductSelect(product);
    }
  };

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
        <Link
          className="button button--mini"
          to={`${AppRoute.ProductScreenPrefix}${id}`}
        >Подробнее
        </Link>
        <Link
          onClick={handleAddToCartLinkClick}
          className={`button button--mini ${isProductAddedToCart
            ? 'button--red-border button--in-cart'
            : 'button--red button--add-to-cart'}`}
          to={AppRoute.CartScreen}
        >{isProductAddedToCart ? 'В Корзине' : 'Купить'}
        </Link>
      </div>
    </div>
  );
}

export default Card;

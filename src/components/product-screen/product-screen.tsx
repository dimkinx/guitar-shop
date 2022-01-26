import {useEffect} from 'react';
import {Link, Redirect, useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getProduct, isProductFailure, isProductIdle, isProductLoading, isProductNotFound} from '../../store/product/product-selectors';
import {getReviewsTotalCount, isReviewsSuccess} from '../../store/reviews/reviews-selectors';
import {fetchProduct} from '../../store/product/product-api-actions';
import {setProductStatus} from '../../store/product/product-actions';
import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Rate from '../rate/rate';
import Reviews from '../reviews/reviews';
import Footer from '../footer/footer';
import LoadingScreen from '../loading-screen/loadingScreen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {addClassModifier} from '../../utils';
import {GuitarType, StatusType} from '../../enums';
import {APP_LOCALE, AppRoute, GuitarTypeTranslation} from '../../constants';

const GuitarTypeToTranslationMap = new Map([
  [GuitarType.Acoustic, GuitarTypeTranslation.Acoustic],
  [GuitarType.Electric, GuitarTypeTranslation.Electric],
  [GuitarType.Ukulele, GuitarTypeTranslation.Ukulele],
]);

function ProductScreen(): JSX.Element {
  const {productId} = useParams<{productId: string}>();
  const {hash} = useLocation();

  const product = useSelector(getProduct);
  const isIdleStatus = useSelector(isProductIdle);
  const isLoadingStatus = useSelector(isProductLoading);
  const isFailureStatus = useSelector(isProductFailure);
  const isNotFoundStatus = useSelector(isProductNotFound);
  const reviewsCount = useSelector(getReviewsTotalCount);
  const isReviewsSuccessStatus = useSelector(isReviewsSuccess);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(Number(productId)));

    return () => {
      dispatch(setProductStatus(StatusType.Idle));
    };
  }, [dispatch, productId]);

  if (isFailureStatus) {
    return <Redirect to={AppRoute.MainScreen} />;
  }

  if (isNotFoundStatus) {
    return <NotFoundScreen />;
  }

  if (product === null || isIdleStatus || isLoadingStatus) {
    return <LoadingScreen />;
  }

  const {id, name, vendorCode, type, description, previewImg, stringCount, rating, price} = product;

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{name}</h1>
          <Breadcrumbs productName={name} />
          <div className="product-container">
            <img
              className="product-container__img"
              src={previewImg}
              width="90"
              height="235"
              alt={`${GuitarTypeToTranslationMap.get(type as GuitarType)} ${stringCount} струнная`}
            />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
              <Rate
                className="product-container__rating"
                width="14"
                height="14"
                rating={rating}
              >{isReviewsSuccessStatus && <span className="rate__count">{reviewsCount}</span>}
              </Rate>
              <div className="tabs">
                <Link
                  className={`${addClassModifier(hash === '#description', 'button', 'black-border')} button--medium tabs__button`}
                  to={(location) => ({...location, hash: 'characteristics'})}
                >Характеристики
                </Link>
                <Link
                  className={`${addClassModifier(hash !== '#description', 'button', 'black-border')} button--medium tabs__button`}
                  to={(location) => ({...location, hash: 'description'})}
                >Описание
                </Link>
                <div
                  className="tabs__content"
                  id={hash === '#description' ? 'description' : 'characteristics'}
                >
                  <table className={`tabs__table ${hash !== '#description' ? '' : 'hidden'}`}>
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{vendorCode}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">{GuitarTypeToTranslationMap.get(type as GuitarType)}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">{stringCount} струнная</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className={`tabs__product-description ${hash === '#description' ? '' : 'hidden'}`}>{description}</p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{price.toLocaleString(APP_LOCALE)} ₽</p>
              <Link to="#" className="button button--red button--big product-container__button">Добавить в корзину</Link>
            </div>
          </div>
          <Reviews
            productId={id}
            productName={name}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductScreen;

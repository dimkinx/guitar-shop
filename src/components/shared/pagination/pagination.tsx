import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link, useHistory, useLocation, useParams} from 'react-router-dom';
import {getProductsTotalCount, isProductsSuccess} from '../../../store/products/products-selectors';
import {addClassModifier, createIndexList} from '../../../utils/utils';
import {AppRoute, PRODUCTS_COUNT_PER_PAGE} from '../../../common/constants';

function Pagination(): JSX.Element {
  const history = useHistory();
  const {search} = useLocation();

  const isProductsSuccessStatus = useSelector(isProductsSuccess);
  const totalCount = useSelector(getProductsTotalCount);
  const totalPageCount = Math.ceil(totalCount / PRODUCTS_COUNT_PER_PAGE);

  const {pageId} = useParams<{pageId: string}>();
  const currentPageId = parseInt(pageId, 10);

  useEffect(() => {
    if (isProductsSuccessStatus && (!currentPageId || currentPageId > totalPageCount)) {
      history.replace({
        pathname: `${AppRoute.CatalogScreenPrefix}_1`,
        search: search,
      });
    }
  }, [isProductsSuccessStatus, currentPageId, history, totalPageCount, search]);

  return (
    <div className="pagination page-content__pagination">
      {totalCount !== 0 && (
        <ul className="pagination__list">
          {currentPageId !== 1 && (
            <li className="pagination__page pagination__page--prev" id="prev">
              <Link
                className="link pagination__page-link"
                to={(location) => ({...location, pathname: `${AppRoute.CatalogScreenPrefix}_${currentPageId - 1}`})}
              >Назад
              </Link>
            </li>
          )}
          {createIndexList(totalPageCount).map((value) => (
            <li
              key={value}
              className={addClassModifier(currentPageId === value + 1, 'pagination__page')}
            >
              <Link
                className="link pagination__page-link"
                to={(location) => ({...location, pathname: `${AppRoute.CatalogScreenPrefix}_${value + 1}`})}
              >{value + 1}
              </Link>
            </li>
          ))}
          {currentPageId !== totalPageCount && totalCount !== 0 && (
            <li className="pagination__page pagination__page--next" id="next">
              <Link
                className="link pagination__page-link"
                to={(location) => ({...location, pathname: `${AppRoute.CatalogScreenPrefix}_${currentPageId + 1}`})}
              >Далее
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Pagination;

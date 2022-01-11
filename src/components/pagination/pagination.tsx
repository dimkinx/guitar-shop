import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link, useHistory, useParams} from 'react-router-dom';
import {getProductsTotalCount} from '../../store/products/products-selectors';
import {addClassModifier, createIndexList} from '../../utils';
import {AppRoute, NUM_PRODUCTS_PER_PAGE} from '../../constants';

function Pagination(): JSX.Element {
  const history = useHistory();

  const totalCount = useSelector(getProductsTotalCount);
  const totalPageCount = Math.ceil(totalCount / NUM_PRODUCTS_PER_PAGE);

  const {pageId} = useParams<{pageId: string}>();
  const currentPageId = Number(pageId);

  useEffect(() => {
    if (currentPageId > totalPageCount) {
      history.push(`${AppRoute.CatalogPagination}_1`);
    }
  }, [currentPageId, history, totalPageCount]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {currentPageId !== 1 && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link
              className="link pagination__page-link"
              to={(location) => ({...location, pathname: `${AppRoute.CatalogPagination}_${currentPageId - 1}`})}
            >Назад
            </Link>
          </li>
        )}
        {createIndexList(totalPageCount).map((index) => (
          <li
            key={index}
            className={addClassModifier(currentPageId === index + 1, 'pagination__page')}
          >
            <Link
              className="link pagination__page-link"
              to={(location) => ({...location, pathname: `${AppRoute.CatalogPagination}_${index + 1}`})}
            >{index + 1}
            </Link>
          </li>
        ))}
        {currentPageId !== totalPageCount && (
          <li className="pagination__page pagination__page--next" id="next">
            <Link
              className="link pagination__page-link"
              to={(location) => ({...location, pathname: `${AppRoute.CatalogPagination}_${currentPageId + 1}`})}
            >Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;

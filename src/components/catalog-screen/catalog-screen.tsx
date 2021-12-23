import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import ProductCard from '../product-card/product-card';
import Pagination from '../pagination/pagination';
import Footer from '../footer/footer';
import {createMockGuitars} from '../../mocks/guitars';

const guitars = createMockGuitars();

function CatalogScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort />
            <div className="cards catalog__cards">
              {guitars.map((guitar) => (
                <ProductCard
                  key={guitar.id}
                  guitar={guitar}
                />
              ))}
            </div>
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogScreen;

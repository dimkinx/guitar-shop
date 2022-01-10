import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import CatalogCards from '../catalog-cards/catalog-cards';
import Pagination from '../pagination/pagination';
import Footer from '../footer/footer';

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
            <CatalogCards />
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogScreen;

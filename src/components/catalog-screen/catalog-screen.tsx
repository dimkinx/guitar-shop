import {Header, Breadcrumbs, Pagination, Footer} from '../shared/shared';
import {Filter, Sort, Cards} from './components/components';

function CatalogScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <Filter />
            <Sort />
            <Cards />
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogScreen;

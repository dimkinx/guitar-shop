import {Header, Breadcrumbs, Footer} from '../shared/shared';

function CartScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <Breadcrumbs />
          <div className="cart">


          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartScreen;

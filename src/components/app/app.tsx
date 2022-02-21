import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import CatalogScreen from '../catalog-screen/catalog-screen';
import ProductScreen from '../product-screen/product-screen';
import CartScreen from '../cart-screen/cart-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {AppRoute} from '../../constants';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={[AppRoute.MainScreen, AppRoute.CatalogScreen]}>
        <Redirect to={`${AppRoute.CatalogScreenPrefix}_1`} />
      </Route>
      <Route exact path={AppRoute.CatalogScreenWithPageId}>
        <CatalogScreen />
      </Route>
      <Route exact path={AppRoute.ProductScreenWithProductId}>
        <ProductScreen />
      </Route>
      <Route exact path={AppRoute.CartScreen}>
        <CartScreen />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;

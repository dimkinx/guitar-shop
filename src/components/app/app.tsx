import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import CatalogScreen from '../catalog-screen/catalog-screen';
import {AppRoute} from '../../constants';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={[AppRoute.MainScreen, AppRoute.CatalogScreen]}>
        <Redirect to={`${AppRoute.CatalogPagination}_1`} />
      </Route>
      <Route exact path={AppRoute.CatalogScreenWithPageId}>
        <CatalogScreen />
      </Route>
    </Switch>
  );
}

export default App;

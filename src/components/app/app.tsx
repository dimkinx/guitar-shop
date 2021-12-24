import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import CatalogScreen from '../catalog-screen/catalog-screen';
import {AppRoute} from '../../constants';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.MainScreen}>
        <Redirect to={AppRoute.CatalogScreen} />
      </Route>
      <Route exact path={AppRoute.CatalogScreen}>
        <CatalogScreen />
      </Route>
    </Switch>
  );
}

export default App;

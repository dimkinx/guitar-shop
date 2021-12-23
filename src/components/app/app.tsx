import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CatalogScreen from '../catalog-screen/catalog-screen';
import {AppRoute} from '../../constants';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.CatalogScreen}>
        <CatalogScreen />
      </Route>
    </Switch>
  );
}

export default App;

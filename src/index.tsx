import React from 'react';
import ReactDOM from 'react-dom';
import {Router as BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import App from './components/app/app';

const browserHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={browserHistory}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

import {Router} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import Breadcrumbs from './breadcrumbs';

const history = createMemoryHistory();

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Breadcrumbs />
      </Router>);

    expect(screen.getByRole('link', {name: /Главная/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Каталог/i})).toBeInTheDocument();
  });
});

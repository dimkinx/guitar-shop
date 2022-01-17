import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Logo from './logo';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Logo />
      </Router>);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
  });
});

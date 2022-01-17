import {Router} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import NotFoundScreen from './not-found-screen';

const history = createMemoryHistory();

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <NotFoundScreen />
      </Router>);

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(/404/i);
  });
});

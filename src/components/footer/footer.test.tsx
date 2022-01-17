import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Footer from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Footer />
      </Router>);

    expect(screen.getByLabelText(/facebook/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/instagram/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/twitter/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', {level: 2, name: /О нас/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {level: 2, name: /Информация/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {level: 2, name: /Контакты/i})).toBeInTheDocument();
  });
});

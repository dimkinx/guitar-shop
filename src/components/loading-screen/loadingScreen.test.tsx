import {render, screen} from '@testing-library/react';
import LoadingScreen from './loadingScreen';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    render(<LoadingScreen />);
    expect(screen.getByRole('heading')).toHaveTextContent(/Loading screen/i);
  });
});

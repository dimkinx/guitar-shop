import {render, screen} from '@testing-library/react';
import ReviewSuccessMessage from './review-success-message';

const onModalOpenSelect = jest.fn();

describe('Component: ReviewSuccessMessage', () => {
  it('should render correctly', () => {
    render(
      <ReviewSuccessMessage
        isModalOpen
        onModalOpenSelect={onModalOpenSelect}
      />);

    expect(screen.getByText(/Спасибо за ваш отзыв/i)).toBeInTheDocument();
  });
});

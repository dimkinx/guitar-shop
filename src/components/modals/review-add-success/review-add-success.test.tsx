import {render, screen} from '@testing-library/react';
import ReviewAddSuccess from './review-add-success';

const onModalOpenSelect = jest.fn();

describe('Component: ReviewSuccessMessage', () => {
  it('should render correctly', () => {
    render(
      <ReviewAddSuccess
        isModalOpen
        onModalOpenSelect={onModalOpenSelect}
      />);

    expect(screen.getByText(/Спасибо за ваш отзыв/i)).toBeInTheDocument();
  });
});

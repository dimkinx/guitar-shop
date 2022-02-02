import {render, screen} from '@testing-library/react';
import ModalSuccessReview from './modal-success-review';

const onModalOpenSelect = jest.fn();

describe('Component: ModalSuccessReview', () => {
  it('should render correctly', () => {
    render(
      <ModalSuccessReview
        isModalOpen
        onModalOpenSelect={onModalOpenSelect}
      />);

    expect(screen.getByText(/Спасибо за ваш отзыв/i)).toBeInTheDocument();
  });
});

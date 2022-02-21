import {render, screen} from '@testing-library/react';
import Modal from './modal';

const onModalOpenSelect = jest.fn();

describe('Component: Modal', () => {
  it('should render correctly', () => {
    render(
      <Modal
        isModalOpen
        onModalOpenSelect={onModalOpenSelect}
      />);

    expect(screen.getByTestId(/modal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Закрыть/i)).toBeInTheDocument();
  });
});

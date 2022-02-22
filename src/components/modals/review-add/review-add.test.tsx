import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import ReviewAdd from './review-add';
import {createMockProduct} from '../../../mocks/products';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {StatusType} from '../../../common/enums';
import {Namespace} from '../../../common/constants';

const onModalOpenSelect = jest.fn();
const mockProduct = createMockProduct();
const mockStore = configureMockStore();

const store = mockStore({
  [Namespace.Reviews]: {
    reviews: [],
    totalCount: 0,
    status: StatusType.Idle,
    postStatus: StatusType.Idle,
  },
});

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ReviewAdd
          isModalOpen
          onModalOpenSelect={onModalOpenSelect}
          productId={mockProduct.id}
          productName={mockProduct.name}
        />
      </Provider>);

    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(/Оставить отзыв/i);
    expect(screen.getByRole('heading', {level: 3})).toHaveTextContent(new RegExp(mockProduct.name,'i'));
  });
});

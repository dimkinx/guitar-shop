import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import ReviewList from './review-list';
import {createMockReviews} from '../../../../mocks/reviews';
import {StatusType} from '../../../../common/enums';
import {Namespace} from '../../../../common/constants';
import 'intersection-observer';

const mockProductId = 0;
const mockReviews = createMockReviews();
const mockTotalCount = mockReviews.length;
const mockStore = configureMockStore();
const history = createMemoryHistory();

const mockSuccessStore = mockStore({
  [Namespace.Reviews]: {
    reviews: mockReviews,
    totalCount: mockReviews.length,
    status: StatusType.Success,
    postStatus: StatusType.Idle,
  },
});

const mockSuccessEmptyStore = mockStore({
  [Namespace.Reviews]: {
    reviews: [],
    totalCount: 0,
    status: StatusType.Success,
    postStatus: StatusType.Idle,
  },
});

const mockLoadingStore = mockStore({
  [Namespace.Reviews]: {
    reviews: [],
    totalCount: 0,
    status: StatusType.Loading,
    postStatus: StatusType.Idle,
  },
});

const mockFailureStore = mockStore({
  [Namespace.Reviews]: {
    reviews: [],
    totalCount: 0,
    status: StatusType.Failure,
    postStatus: StatusType.Idle,
  },
});

describe('Component: ReviewList', () => {
  it('should render correctly if success', () => {
    mockSuccessStore.dispatch = jest.fn();

    render(
      <Provider store={mockSuccessStore}>
        <Router history={history}>
          <ReviewList
            productId={mockProductId}
          />
        </Router>
      </Provider>);

    expect(screen.queryAllByTestId(/review/i)).toHaveLength(mockTotalCount);
  });

  it('should render correctly if success but store is empty', () => {
    mockSuccessEmptyStore.dispatch = jest.fn();

    render(
      <Provider store={mockSuccessEmptyStore}>
        <Router history={history}>
          <ReviewList
            productId={mockProductId}
          />
        </Router>
      </Provider>);

    expect(screen.getByText(/Отзывы о данном товаре - отсутствуют/i)).toBeInTheDocument();
  });

  it('should render correctly if loading and store is empty', () => {
    mockLoadingStore.dispatch = jest.fn();

    render(
      <Provider store={mockLoadingStore}>
        <Router history={history}>
          <ReviewList
            productId={mockProductId}
          />
        </Router>
      </Provider>);

    expect(screen.getByText(/Загрузка/i)).toBeInTheDocument();
  });

  it('should render correctly if failure and store is empty', () => {
    mockFailureStore.dispatch = jest.fn();

    render(
      <Provider store={mockFailureStore}>
        <Router history={history}>
          <ReviewList
            productId={mockProductId}
          />
        </Router>
      </Provider>);

    expect(screen.getByText(/Что-то пошло не так/i)).toBeInTheDocument();
  });
});

import {productsInitialState, productsReducer} from './products-reducer';
import {createMockProducts} from '../../mocks/products';
import {setProducts, setProductsStatus, setProductsTotalCount} from './products-actions';
import {StatusType} from '../../common/enums';

const mockActionType = 'UNKNOWN_ACTION';
const mockProducts = createMockProducts();
const mockTotalCount = mockProducts.length;
const mockFetchStatus = StatusType.Success;

describe('Reducer: products', () => {
  it('without additional parameters should return initial state', () => {
    expect(productsReducer(void 0, {type: mockActionType}))
      .toEqual(productsInitialState);
  });

  it('should set products', () => {
    expect(productsReducer(productsInitialState, setProducts(mockProducts)))
      .toEqual({
        ...productsInitialState,
        products: mockProducts,
      });
  });

  it('should set total count', () => {
    expect(productsReducer(productsInitialState, setProductsTotalCount(mockTotalCount)))
      .toEqual({
        ...productsInitialState,
        totalCount: mockTotalCount,
      });
  });

  it('should set fetch status', () => {
    expect(productsReducer(productsInitialState, setProductsStatus(mockFetchStatus)))
      .toEqual({
        ...productsInitialState,
        status: mockFetchStatus,
      });
  });
});

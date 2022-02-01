import {productInitialState, productReducer} from './product-reducer';
import {createMockProduct} from '../../mocks/products';
import {setProduct, setProductStatus} from './product-actions';
import {StatusType} from '../../enums';

const mockActionType = 'UNKNOWN_ACTION';
const mockProduct = createMockProduct();
const mockFetchStatus = StatusType.Success;

describe('Reducer: product', () => {
  it('without additional parameters should return initial state', () => {
    expect(productReducer(void 0, {type: mockActionType}))
      .toEqual(productInitialState);
  });

  it('should set product', () => {
    expect(productReducer(productInitialState, setProduct(mockProduct)))
      .toEqual({
        ...productInitialState,
        product: mockProduct,
      });
  });

  it('should set fetch status', () => {
    expect(productReducer(productInitialState, setProductStatus(mockFetchStatus)))
      .toEqual({
        ...productInitialState,
        status: mockFetchStatus,
      });
  });
});

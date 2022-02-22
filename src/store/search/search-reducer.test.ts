import {searchInitialState, searchReducer} from './search-reducer';
import {setFoundProducts, setFoundProductsStatus} from './search-actions';
import {createMockProducts} from '../../mocks/products';
import {StatusType} from '../../common/enums';

const mockActionType = 'UNKNOWN_ACTION';
const mockProducts = createMockProducts();
const mockFetchStatus = StatusType.Success;

describe('Reducer: search', () => {
  it('without additional parameters should return initial state', () => {
    expect(searchReducer(void 0, {type: mockActionType}))
      .toEqual(searchInitialState);
  });

  it('should set found products', () => {
    expect(searchReducer(searchInitialState, setFoundProducts(mockProducts)))
      .toEqual({
        ...searchInitialState,
        foundProducts: mockProducts,
      });
  });

  it('should set fetch status', () => {
    expect(searchReducer(searchInitialState, setFoundProductsStatus(mockFetchStatus)))
      .toEqual({
        ...searchInitialState,
        status: mockFetchStatus,
      });
  });
});

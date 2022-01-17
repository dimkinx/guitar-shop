import {sortInitialState, sortReducer} from './sort-reducer';
import {setOrderType, setSortType} from './sort-actions';
import {OrderType, SortType} from '../../enums';

const mockActionType = 'UNKNOWN_ACTION';
const mockSortType = SortType.Price;
const mockOrderType = OrderType.Ascending;

describe('Reducer: sort', () => {
  it('without additional parameters should return initial state', () => {
    expect(sortReducer(void 0, {type: mockActionType}))
      .toEqual(sortInitialState);
  });

  it('should set sort type', () => {
    expect(sortReducer(sortInitialState, setSortType(mockSortType)))
      .toEqual({
        ...sortInitialState,
        sortType: mockSortType,
      });
  });

  it('should set order type', () => {
    expect(sortReducer(sortInitialState, setOrderType(mockOrderType)))
      .toEqual({
        ...sortInitialState,
        orderType: mockOrderType,
      });
  });
});

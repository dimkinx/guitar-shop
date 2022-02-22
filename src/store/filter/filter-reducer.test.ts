import {filterInitialState, filterReducer} from './filter-reducer';
import {setPriceRangeMax, setPriceRangeMin, setPriceRangeStatus} from './filter-actions';
import {StatusType} from '../../common/enums';
import {datatype} from 'faker';

const mockActionType = 'UNKNOWN_ACTION';
const mockPriceRangeMin = datatype.number({min: 1000, max: 10000});
const mockPriceRangeMax = datatype.number({min: 10000, max: 100000});
const mockFetchStatus = StatusType.Success;

describe('Reducer: filter', () => {
  it('without additional parameters should return initial state', () => {
    expect(filterReducer(void 0, {type: mockActionType}))
      .toEqual(filterInitialState);
  });

  it('should set price range min', () => {
    expect(filterReducer(filterInitialState, setPriceRangeMin(mockPriceRangeMin)))
      .toEqual({
        ...filterInitialState,
        priceRange: {
          ...filterInitialState.priceRange,
          min: mockPriceRangeMin,
        },
      });
  });

  it('should set price range max', () => {
    expect(filterReducer(filterInitialState, setPriceRangeMax(mockPriceRangeMax)))
      .toEqual({
        ...filterInitialState,
        priceRange: {
          ...filterInitialState.priceRange,
          max: mockPriceRangeMax,
        },
      });
  });

  it('should set fetch status', () => {
    expect(filterReducer(filterInitialState, setPriceRangeStatus(mockFetchStatus)))
      .toEqual({
        ...filterInitialState,
        status: mockFetchStatus,
      });
  });
});

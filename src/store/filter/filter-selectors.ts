import {PriceRangeState, State} from '../../types/state';

const getPriceRange = (state: State): PriceRangeState => state.filter.priceRange;

export {getPriceRange};

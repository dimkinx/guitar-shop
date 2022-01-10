import {State} from '../../types/state';
import {OrderType, SortType} from '../../enums';

const getSortType = (state: State): SortType | null => state.sort.sortType;
const getOrderType = (state: State): OrderType | null => state.sort.orderType;

export {getSortType, getOrderType};

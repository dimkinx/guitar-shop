import {datatype, name, lorem, time} from 'faker';
import {Review} from '../types/review';

const createMockReview = (): Review => ({
  id: datatype.uuid(),
  userName: `${name.firstName()} ${name.lastName()}`,
  advantage: lorem.paragraph(),
  disadvantage: lorem.paragraph(),
  comment: lorem.paragraph(),
  rating: datatype.number(5),
  createAt: time.recent('wide'),
  guitarId: 0,
});

const createMockReviews = (amount = 10): Review[] => new Array(amount).fill(null).map(() => createMockReview());

export {createMockReview, createMockReviews};

import {datatype, image, lorem} from 'faker';
import {Guitar} from '../types/guitar';

const createMockGuitar = (): Guitar => ({
  id: datatype.number(),
  name: lorem.words(3),
  vendorCode: datatype.uuid(),
  type: lorem.word(),
  description: lorem.paragraph(),
  previewImg: image.imageUrl(75, 190, 'music', true, true),
  stringCount: datatype.number(12),
  rating: datatype.number(5),
  price: datatype.number({min: 1000, max: 100000}),
});

const createMockGuitars = (): Guitar[] => new Array(datatype.number(10)).fill(null).map(() => createMockGuitar());

export {createMockGuitars};

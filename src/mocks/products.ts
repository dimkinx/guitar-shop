import {datatype, image, lorem} from 'faker';
import {Product} from '../types/product';

const createMockProduct = (): Product => ({
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

const createMockProducts = (amount = 10): Product[] => new Array(amount).fill(null).map(() => createMockProduct());

export {createMockProduct, createMockProducts};

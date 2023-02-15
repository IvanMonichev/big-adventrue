import { getRandomInteger } from '../utils/helpers';
import { lorem } from './lorem-ipsum';


export const generateOffers = (id) => ({
  id,
  title: lorem.generateWords(getRandomInteger(1, 2)),
  price: getRandomInteger(10, 200),
})


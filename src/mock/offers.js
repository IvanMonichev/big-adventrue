import { getRandomInteger } from '../utils/helpers';
import { lorem } from './lorem-ipsum';


export const generateOffers = (id) => ({
  id,
  title: lorem.generateSentences(),
  price: getRandomInteger(120, 2500),
})


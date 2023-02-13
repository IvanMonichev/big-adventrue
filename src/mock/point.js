import { getRandomInteger } from '../utils/helpers';
import { generateDestionation } from './destination';

const generateType = () => {
  const types = [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant'
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
}

const generatePoint = () => ({
  id: 0,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  base_price: 1100,
  type: generateType(),
  isFavorite: false,
  destination: [],
  offers: []
})

export { generatePoint }

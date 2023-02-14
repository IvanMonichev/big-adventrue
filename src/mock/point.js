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

const getRandomListIndex = (amount) => {

  const listRandomListIndex = [];

  let counter = 0;

  while (counter < amount) {
    listRandomListIndex.push(getRandomInteger(0, 20))
    counter++;
  }

  return listRandomListIndex;
}

const generatePoint = (id) => ({
  id,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  base_price: getRandomInteger(500, 4500),
  type: generateType(),
  isFavorite: Boolean(getRandomInteger()),
  destination: generateDestionation(),
  offers: getRandomListIndex(getRandomInteger(1, 5)),
})

const buildPoint = (id) => {
  const point = generatePoint(id);
  // point.destination = point.destination.map((item) => generateDestionation(item));
  return point;
}

export { buildPoint, generateType }

import { getRandomInteger } from '../utils/helpers';
import { generateDestionation } from './destination';
import dayjs from 'dayjs';

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

export const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, 'millisecond').toDate();
}

const generatePoint = (id) => ({
  id,
  dateFrom: generateDate(),
  dateTo: generateDate(),
  basePrice: getRandomInteger(20, 150),
  type: generateType(),
  isFavorite: Boolean(getRandomInteger()),
  destination: generateDestionation(),
  offers: getRandomListIndex(getRandomInteger(1, 5)),
})


export { generatePoint, generateType }

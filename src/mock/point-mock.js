import { getRandomInteger } from '../utils/helpers';
import { generateDestionation } from './destination-mock';
import dayjs from 'dayjs';
import { TYPES } from '../utils/constants';

const generateType = () => {

  const randomIndex = getRandomInteger(0, TYPES.length - 1);

  return TYPES[randomIndex];
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

const generateDate = () => {
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


export { generatePoint, generateType, generateDate }

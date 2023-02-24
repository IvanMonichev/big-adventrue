import { getRandomInteger } from '../utils/common-utils';
import dayjs from 'dayjs';
import { TYPES } from '../constants/constants';
import { customAlphabet } from 'nanoid';

const generateType = () => {

  const randomIndex = getRandomInteger(0, TYPES.length - 1);

  return TYPES[randomIndex];
};

const getRandomListIndex = (amount) => {

  const listRandomListIndex = [];

  let counter = 0;

  while (counter < amount) {
    listRandomListIndex.push(getRandomInteger(0, 20));
    counter++;
  }

  return listRandomListIndex;
};

const generateDate = () => {
  const maxDaysGap = getRandomInteger(7, 60);
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, 'days').toDate();
};

const pointId = customAlphabet('1234567890', 7);

const generatePoint = () => ({
  id: pointId(),
  dateFrom: generateDate(),
  dateTo: generateDate(),
  basePrice: getRandomInteger(20, 150),
  type: generateType(),
  isFavorite: Boolean(getRandomInteger()),
  destination: getRandomInteger(0, 19),
  offers: getRandomListIndex(getRandomInteger(1, 5)),
});

export { generatePoint, generateType, generateDate };

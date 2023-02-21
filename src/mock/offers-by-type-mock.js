import { getRandomInteger } from '../utils/common-utils';
import { lorem } from '../vendor/lorem-ipsum';
import { TYPES } from '../constants/constants';


const generateOffers = () => {
  const listRandomListOffers = [];

  let counter = 0;

  const randomAmount = getRandomInteger(2, 10);

  while (counter < randomAmount) {
    listRandomListOffers.push({
      id: counter,
      title: lorem.generateWords(getRandomInteger(1, 2)),
      price: getRandomInteger(10, 200),
    });

    counter++;
  }

  return listRandomListOffers;
};

export const generateOffersByType = () => TYPES.map((item) => ({
  type: item,
  offers: generateOffers()
}));


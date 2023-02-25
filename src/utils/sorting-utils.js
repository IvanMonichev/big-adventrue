import { SortingType } from '../constants/constants';

const isChecked = (type, currentType) => {
  switch (type) {
    case currentType:
      return 'checked';
    case SortingType.EVENT:
      return 'disabled';
    case SortingType.OFFERS:
      return 'disabled';
    default:
      return '';
  }
};

export {
  isChecked
};

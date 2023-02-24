import { SortingType } from '../constants/constants';

const isChecked = (type) => {
  switch (type) {
    case SortingType.DAY:
      return 'checked';
    case SortingType.PRICE:
      return '';
    case SortingType.TIME:
      return '';
    default:
      return 'disabled';
  }
};

export {
  isChecked
};

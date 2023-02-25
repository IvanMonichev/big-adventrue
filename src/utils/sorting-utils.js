import { SortingType } from '../constants/constants';

const isChecked = (type, defaultType) => {
  switch (type) {
    case SortingType.DAY || defaultType:
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

import AbstractView from '../framework/view/abstract-view';
import { SortingType } from '../constants/constants';
import { isChecked } from '../utils/sorting-utils';
import { isDemandElement } from '../utils/common-utils';

const createSortingItemTemplate = (sortingType, currentType) => sortingType.map((type) =>
  `<div class="trip-sort__item  trip-sort__item--${type}">
     <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" data-sorting-type="${type}" ${isChecked(type, currentType)}>
     <label class="trip-sort__btn" for="sort-${type}">${type}</label>
   </div>`
).join('');

const createSortingTemplate = (sortingType, currentType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortingItemTemplate(Object.values(sortingType), currentType)}
   </form>`
);

export default class SortingView extends AbstractView {
  #currentSortingType = null;
  constructor(currentSortingType) {
    super();
    this.#currentSortingType = currentSortingType;
  }
  get template() {
    return createSortingTemplate(SortingType, this.#currentSortingType);
  }

  setSortingTypeChangeHandler = (callback) => {
    this._callback.sortingTypeChange = callback;
    this.element.addEventListener('change', this.#sortingTypeChangeHandler);
  };

  #sortingTypeChangeHandler = (evt) => {
    if (!isDemandElement(evt,'.trip-sort__input')) {
      return;
    }

    evt.preventDefault();
    this._callback.sortingTypeChange(evt.target.dataset.sortingType);
  };
}

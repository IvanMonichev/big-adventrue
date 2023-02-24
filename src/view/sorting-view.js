import AbstractView from '../framework/view/abstract-view';
import { SortingType } from '../constants/constants';
import { isChecked } from '../utils/sorting-utils';

const createSortingItemTemplate = (sortingType) => sortingType.map((type) =>
  `<div class="trip-sort__item  trip-sort__item--${type}">
     <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" data-sorting-type="${type}" ${isChecked(type)}>
     <label class="trip-sort__btn" for="sort-${type}">${type}</label>
   </div>`
).join('');

const createSortingTemplate = (sortingType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortingItemTemplate(Object.values(sortingType))}
   </form>`
);

export default class SortingView extends AbstractView {
  get template() {
    return createSortingTemplate(SortingType);
  }

  setSortingTypeChangeHandler = (callback) => {
    this._callback.sortingTypeChange = callback;
    this.element.addEventListener('change', this.#sortingTypeChangeHandler);
  };

  #sortingTypeChangeHandler = (evt) => {
    if (!evt.target.closest('.trip-sort__input')) {
      return;
    }

    evt.preventDefault();
    this._callback.sortingTypeChange(evt.target.dataset.sortingType);
  };
}

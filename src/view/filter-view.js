import AbstractView from '../framework/view/abstract-view';
const createFilterItemTemplate = (filters, currentFilter) =>
  filters.map(({ type, name }) => (
    `<div class="trip-filters__filter">
       <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilter ? 'checked' : ''}>
       <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
     </div>`
  )).join('');

const createFilterTemplate = (filters, currentFilter) => (
  `<form class="trip-filters" action="#" method="get">
    ${createFilterItemTemplate(filters, currentFilter)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);


export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }
  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChange = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}

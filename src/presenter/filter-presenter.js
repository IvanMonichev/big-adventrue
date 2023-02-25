import { remove, render, replace } from '../framework/render';
import { FilterType, UpdateType } from '../constants/constants';
import FilterView from '../view/filter-view';


export default class FilterPresenter {
  #container = null;
  #filterModel = null;
  #filterComponent = null;
  #pointsModel = null;

  constructor(container, filterModel, pointsModel) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get filters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
      },
      {
        type: FilterType.PAST,
        name: 'Past',
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
      },
    ];
  }

  init = () => {

    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChange(this.#filterTypeChangeHandler);

    // Проверка на отсутствие элементов
    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);

    remove(prevFilterComponent);
  };

  #modelEventHandler = () => {
    this.init();
  };

  #filterTypeChangeHandler = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}

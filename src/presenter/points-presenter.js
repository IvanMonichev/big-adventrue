import ListView from '../view/list-view';
import ListEmptyView from '../view/list-empty-view';
import PointPresenter from './point-presenter';
import { remove, render } from '../framework/render';
import { sortPointsByPrice, sortPointsByTime } from '../utils/point-utils';
import SortingView from '../view/sorting-view';
import { SortingType, UpdateType, UserAction } from '../constants/constants';
import { filter } from '../utils/filter-utils';

export default class PointsPresenter {
  #listViewComponent = new ListView();
  #listEmptyComponent = new ListEmptyView();
  #sortingComponent = null;
  #pointsContainer = null;
  #pointsModel = null;
  #listDestinations = null;
  #listOffers = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #currentSortingType = SortingType.DAY;

  constructor(pointsContainer, pointsModel, filterModel) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  init = () => {
    this.#listDestinations = [...this.#pointsModel.destinations];
    this.#listOffers = [...this.#pointsModel.offersByType];
    this.#renderPoints();
  };

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filterPoints = filter[filterType](points);

    switch (this.#currentSortingType) {
      case SortingType.TIME:
        return filterPoints.sort(sortPointsByTime);
      case SortingType.PRICE:
        return filterPoints.sort(sortPointsByPrice);
    }

    return filterPoints;
  }

  #viewActionHandler = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderPoints();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList({resetSortingType: true});
        this.#renderPoints();
        break;
    }
  };

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point, destinations, offersBtType) => {
    const pointPresenter = new PointPresenter(this.#pointsContainer, this.#viewActionHandler, this.#modeChangeHandler);
    pointPresenter.init(point, destinations, offersBtType);

    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderSorting = () => {
    this.#sortingComponent = new SortingView(this.#currentSortingType);
    this.#sortingComponent.setSortingTypeChangeHandler(this.#sortingTypeChangeHandler);
    render(this.#sortingComponent, this.#pointsContainer);
  };

  #renderList = () => {
    render(this.#listViewComponent, this.#pointsContainer);
  };

  #renderEmptyList = () => {
    render(this.#listEmptyComponent, this.#pointsContainer);
  };

  #renderPoints = () => {
    if (this.points.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderSorting();
      this.#renderList();
      this.points.forEach((point) => this.#renderPoint(point, this.#listDestinations, this.#listOffers));
    }
  };

  #sortingTypeChangeHandler = (sortingType) => {
    if (this.#currentSortingType === sortingType) {
      return;
    }

    this.#currentSortingType = sortingType;
    this.#clearPointList();
    this.#renderPoints();
  };

  // Метод для очистки списка элементов, установка метода сортировки по умолчанию
  #clearPointList ({resetSortingType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortingComponent);
    remove(this.#listViewComponent);
    remove(this.#listEmptyComponent);

    if (resetSortingType) {
      this.#currentSortingType = SortingType.DAY;
    }
  }
}

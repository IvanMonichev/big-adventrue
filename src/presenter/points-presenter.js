import ListView from '../view/list-view';
import ListEmptyView from '../view/list-empty-view';
import PointPresenter from './point-presenter';
import { render } from '../framework/render';
import { sortPointsByPrice, sortPointsByTime, updateItem } from '../utils/point-utils';
import SortingView from '../view/sorting-view';
import { SortingType } from '../constants/constants';

export default class PointsPresenter {
  #listViewComponent = new ListView();
  #listEmptyComponent = new ListEmptyView();
  #sortingComponent = new SortingView();
  #pointsContainer = null;
  #pointsModel = null;
  #listDestinations = null;
  #listOffers = null;

  #pointPresenters = new Map();
  #currentSortingType = SortingType.DAY;

  constructor(pointsContainer, pointsModel) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#listDestinations = [...this.#pointsModel.destinations];
    this.#listOffers = [...this.#pointsModel.offersByType];
    this.#renderPoints();
  };

  get points() {
    switch (this.#currentSortingType) {
      case SortingType.TIME:
        return [...this.#pointsModel.points].sort(sortPointsByTime);
      case SortingType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointsByPrice);
    }

    return this.#pointsModel.points;
  }

  #pointUpdateHandler = (updatedPoint, destinations, offersByType) => {
    // Место для вызова модели
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, destinations, offersByType);
  };

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point, destinations, offersBtType) => {
    const pointPresenter = new PointPresenter(this.#pointsContainer, this.#pointUpdateHandler, this.#modeChangeHandler);
    pointPresenter.init(point, destinations, offersBtType);

    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderSorting = () => {
    render(this.#sortingComponent, this.#pointsContainer);
    this.#sortingComponent.setSortingTypeChangeHandler(this.#sortingTypeChangeHandler);
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
      this.points.forEach((point) => this.#renderPoint(point, this.#listDestinations, this.#listOffers))
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

  #clearPointList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };
}

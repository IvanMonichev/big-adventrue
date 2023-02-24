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
  #listPoints = null;
  #listDestinations = null;
  #listOffers = null;

  #pointPresenters = new Map();
  #sourcedPoints = [];
  #currentSortingType = SortingType.DAY;

  constructor(pointsContainer, pointsModel) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#listPoints = [...this.#pointsModel.points];
    this.#listDestinations = [...this.#pointsModel.destinations];
    this.#listOffers = [...this.#pointsModel.offersByType];
    this.#sourcedPoints = [...this.#pointsModel.points];
    this.#sortPoints(this.#currentSortingType);
    this.#renderPoints();
  };

  #pointUpdateHandler = (updatedPoint, destinations, offersByType) => {
    this.#listPoints = updateItem(this.#listPoints, updatedPoint);
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
    if (this.#listPoints.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderSorting();
      this.#renderList();

      for (let i = 0; i < this.#listPoints.length; i++) {
        this.#renderPoint(this.#listPoints[i], this.#listDestinations, this.#listOffers);
      }
    }
  };

  #sortPoints = (sortingType) => {
    switch (sortingType) {
      case SortingType.TIME:
        this.#listPoints.sort(sortPointsByTime);
        break;
      case SortingType.PRICE:
        this.#listPoints.sort(sortPointsByPrice);
        break;
      default:
        this.#listPoints = [...this.#sourcedPoints];
    }
  };

  #sortingTypeChangeHandler = (sortingType) => {
    this.#sortPoints(sortingType);

    this.#clearPointList();
    this.#renderPoints();
  };

  #clearPointList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };
}

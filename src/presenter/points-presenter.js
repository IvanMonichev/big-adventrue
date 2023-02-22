import ListView from '../view/list-view';
import ListEmptyView from '../view/list-empty-view';
import PointPresenter from './point-presenter';
import { render } from '../framework/render';
import { updateItem } from '../utils/point-utils';
import SortingView from '../view/sorting-view';

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

  constructor(pointsContainer, pointsModel) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#listPoints = [...this.#pointsModel.points];
    this.#listDestinations = [...this.#pointsModel.destinations];
    this.#listOffers = [...this.#pointsModel.offersByType];
    this.#renderPoints();
  };

  #pointUpdateHandler = (updatedPoint, destinations, offersByType) => {
    this.#listPoints = updateItem(this.#listPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, destinations, offersByType);
  };

  #renderPoint = (point, destinations, offersBtType) => {
    const pointPresenter = new PointPresenter(this.#pointsContainer, this.#pointUpdateHandler);
    pointPresenter.init(point, destinations, offersBtType);

    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderSorting = () => {
    render(this.#sortingComponent, this.#pointsContainer);
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

  #clearPointList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };
}

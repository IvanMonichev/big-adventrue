import { render } from '../utils/render';
import PointItemView from '../view/point-item-view';
import ListView from '../view/list-view';
import EditPointView from '../view/edit-point-view';
import { isEscape } from '../utils/helpers';
import ListEmptyView from '../view/list-empty-view';
import PointPresenter from './point-presentor';

export default class PointsPresenter {
  #listViewComponent = new ListView();
  #listEmptyComponent = new ListEmptyView();
  #pointsContainer = null;
  #pointsModel = null;
  #listPoints = null;
  #listDestinations = null;
  #listOffers = null;

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

  #renderPoint = (point, destinations, offersBtType) => {
    const pointPresenter = new PointPresenter(this.#pointsContainer);
    pointPresenter.init(point, destinations, offersBtType);
  };

  #renderPoints = () => {
    if (this.#listPoints.length === 0) {
      render(this.#listEmptyComponent, this.#pointsContainer);
    } else {
      render(this.#listViewComponent, this.#pointsContainer);
      for (let i = 0; i < this.#listPoints.length; i++) {
        this.#renderPoint(this.#listPoints[i], this.#listDestinations, this.#listOffers);
      }
    }
  };
}

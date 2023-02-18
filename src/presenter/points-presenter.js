import { render, RenderPosition } from '../utils/render';
import PointItemView from '../view/point-item-view';
import AddPointView from '../view/add-point-view';
import ListView from '../view/list-view';
import EditPointView from '../view/edit-point-view';

export default class PointsPresenter {
  #listViewComponent = new ListView();
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

    render(this.#listViewComponent, this.#pointsContainer);
    render(new AddPointView(this.#listDestinations, this.#listOffers), this.#listViewComponent.element);
    render(new EditPointView(this.#listPoints[0], this.#listDestinations, this.#listOffers), this.#listViewComponent.element, RenderPosition.AFTERBEGIN);

    for (let i = 0; i < this.#listPoints.length; i++) {
      render(new PointItemView(this.#listPoints[i], this.#listDestinations, this.#listOffers), this.#listViewComponent.element);
    }
  };
}

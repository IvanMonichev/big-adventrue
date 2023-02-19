import { render } from '../utils/render';
import PointItemView from '../view/point-item-view';
import ListView from '../view/list-view';
import EditPointView from '../view/edit-point-view';
import { isEscape } from '../utils/helpers';
import ListEmptyView from '../view/list-empty-view';

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

  #renderPoint = (points, destinations, offersBtType) => {
    const pointComponent = new PointItemView(points, destinations, offersBtType);
    const editPointComponent = new EditPointView(points, destinations, offersBtType);

    const replacePointToForm = () => {
      this.#listViewComponent.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#listViewComponent.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const handleEscKeyDown = (evt) => {
      if (isEscape(evt) || evt.key === 'ArrowUp') {
        evt.preventDefault();
        replaceFormToPoint();
      }
    };

    const removeListenerEscKeyDown = () => {
      document.removeEventListener('keydown', handleEscKeyDown);
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', handleEscKeyDown, {once: true});
    });

    editPointComponent.element.querySelector('form').addEventListener('submit', () => {
      replaceFormToPoint();
      removeListenerEscKeyDown();
    });

    editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      removeListenerEscKeyDown();
    });

    render(pointComponent, this.#listViewComponent.element);
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

import { render, RenderPosition } from '../utils/render';
import PointItemView from '../view/point-item-view';
import AddPointView from '../view/add-point-view';
import ListView from '../view/list-view';
import EditPointView from '../view/edit-point-view';

export default class PointsPresenter {
  listViewComponent = new ListView();

  init = (container, pointsModel) => {
    this.container = container;
    this.pointsModel = pointsModel;
    this.listPoints = [...this.pointsModel.getPoints()];
    this.listDestinations = [...this.pointsModel.getDestinations()]
    this.listOffers = [...this.pointsModel.getOffersByType()];

    render(this.listViewComponent, this.container);
    render(new AddPointView(this.listDestinations, this.listOffers), this.listViewComponent.getElement());
    render(new EditPointView(this.listPoints[0], this.listDestinations, this.listOffers), this.listViewComponent.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < this.listPoints.length; i++) {
      render(new PointItemView(this.listPoints[i], this.listDestinations, this.listOffers), this.listViewComponent.getElement());
    }
  }
}

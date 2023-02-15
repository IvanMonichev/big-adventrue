import { render, RenderPosition } from '../utils/render';
import PointItemView from '../view/point-item-view';
import AddNewPointView from '../view/add-new-point-view';
import ListView from '../view/list-view';
import EditPointView from '../view/edit-point-view';

export default class PointsPresenter {
  listViewComponent = new ListView();
  addNewPointComponent = new AddNewPointView();
  editPointComponent = new EditPointView();

  init = (container, pointsModel) => {
    this.container = container;
    this.pointsModel = pointsModel;
    this.listPoints = [...this.pointsModel.getPoints()];
    this.listOffers = [...this.pointsModel.getOffersByType()];

    render(this.listViewComponent, this.container);
    render(this.addNewPointComponent, this.listViewComponent.getElement());
    render(this.editPointComponent, this.listViewComponent.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < this.listPoints.length; i++) {
      render(new PointItemView(this.listPoints[i], this.listOffers), this.listViewComponent.getElement());
    }
  }
}

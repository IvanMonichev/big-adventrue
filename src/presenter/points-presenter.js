import { render, RenderPosition } from '../render';
import PointItemView from '../view/point-item-view';
import AddNewPointView from '../view/add-new-point-view';
import ListView from '../view/list-view';
import { POINT_COUNT } from '../utils/constants';
import EditPointView from '../view/edit-point-view';

export default class PointsPresenter {
  listViewComponent = new ListView();
  addNewPointComponent = new AddNewPointView();
  editPointComponent = new EditPointView();

  init = (container) => {
    this.container = container;

    render(this.listViewComponent, this.container);
    render(this.addNewPointComponent, this.listViewComponent.getElement());
    render(this.editPointComponent, this.listViewComponent.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < POINT_COUNT; i++) {
      render(new PointItemView(), this.listViewComponent.getElement());
    }
  }
}

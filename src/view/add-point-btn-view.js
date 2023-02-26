import AbstractView from '../framework/view/abstract-view';

const createAddPointBtnViewTemplate = () => (
  '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>'
);

export default class AddPointBtnView extends AbstractView {

  get template() {
    return createAddPointBtnViewTemplate();
  }

  setAddPointClickHandler = (callback) => {
    this._callback.clickAddPoint = callback;
    this.element.addEventListener('click', this.#addPointClickHandler);
  };

  #addPointClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickAddPoint();
  };
}

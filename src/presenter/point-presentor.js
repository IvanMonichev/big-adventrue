import PointItemView from '../view/point-item-view';
import EditPointView from '../view/edit-point-view';
import { render, replace } from '../framework/render';
import { isEscape } from '../utils/helpers';


export default class PointPresenter {
  #point = null;
  #destinations = null;
  #offersBtType = null;
  #pointComponent = null;
  #editPointComponent = null;
  #container = null;

  constructor(container) {
    this.#container = container;
  }

  init = (point, destinations, offersBtType) => {
    // Создаём экземпляры компонентов
    this.#pointComponent = new PointItemView(point, destinations, offersBtType);
    this.#editPointComponent = new EditPointView(point, destinations, offersBtType);

    // Вешаем слушатели через колбэк
    this.#pointComponent.setButtonClickHandler(this.#editButtonClickHandler);
    this.#editPointComponent.setButtonClickHandler(this.#closeButtonClickHandler);
    this.#editPointComponent.setFormSubmitHandler(this.#formSubmitHandler);

    render(this.#pointComponent, this.#container);
  };

  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #editButtonClickHandler = () => {
    this.#replacePointToForm();
  };

  #closeButtonClickHandler = () => {
    this.#replaceFormToPoint();
  };

  #formSubmitHandler = () => {
    this.#replaceFormToPoint();
    console.log('Форма выполнена.');
  };

  #escKeyDownHandler = (evt) => {
    if (isEscape(evt) || evt.key === 'ArrowUp') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };
}

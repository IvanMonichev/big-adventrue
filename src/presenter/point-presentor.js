import PointItemView from '../view/point-item-view';
import EditPointView from '../view/edit-point-view';
import { remove, render, replace } from '../framework/render';
import { isEscape } from '../utils/point-utils';


export default class PointPresenter {
  #pointComponent = null;
  #editPointComponent = null;
  #container = null;

  constructor(container) {
    this.#container = container;
  }

  init = (point, destinations, offersBtType) => {

    const prevPontComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    // Создаём экземпляры компонентов
    this.#pointComponent = new PointItemView(point, destinations, offersBtType);
    this.#editPointComponent = new EditPointView(point, destinations, offersBtType);

    // Вешаем слушатели через колбэк
    this.#pointComponent.setButtonClickHandler(this.#editButtonClickHandler);
    this.#editPointComponent.setButtonClickHandler(this.#closeButtonClickHandler);
    this.#editPointComponent.setFormSubmitHandler(this.#formSubmitHandler);

    // Проверка на отсутствие элементов
    if (prevPontComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    // Проверка на наличие в DOM для оптимизации
    if (this.#container.contains(prevPontComponent.element)) {
      replace(this.#pointComponent, prevPontComponent);
    }

    if (this.#container.contains(prevPontComponent.element)) {
      replace(this.#editPointComponent, prevPontComponent);
    }

    remove(prevPontComponent);
    remove(prevEditPointComponent);
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
  };

  #escKeyDownHandler = (evt) => {
    if (isEscape(evt) || evt.key === 'ArrowUp') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };
}

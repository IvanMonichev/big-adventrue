import { remove, render, RenderPosition, replace } from '../framework/render';
import { isEscape } from '../utils/point-utils';
import { Mode, UpdateType, UserAction } from '../constants/constants';
import AddPointView from '../view/add-point-view';
import { nanoid } from 'nanoid';


export default class AddPointPresenter {
  #destinations = null;
  #offersBtType = null;
  #container = null;
  #changeData = null;
  #addPointComponent = null;

  constructor(container, changeData) {
    this.#container = container;
    this.#changeData = changeData;
  }

  init = (destinations, offersByType) => {
    this.#destinations = destinations;
    this.#offersBtType = offersByType;

    if (this.#addPointComponent !== null) {
      return;
    }
    // Создаём экземпляры компонентов
    this.#addPointComponent = new AddPointView(destinations, offersByType);

    render(this.#addPointComponent, this.#container, RenderPosition.AFTEREND);
  };

  destroy = () => {
    if (this.#addPointComponent === null) {
      return;
    }

    // Нужно будет произвести очистку колбэков.
    remove(this.#addPointComponent);
  };

  #formSubmitHandler = (point) => {
    this.#changeData(UserAction.ADD_POINT, UpdateType.MINOR, { id: nanoid(), ...point });
    this.destroy();
  };

  #cancelClickHandler = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscape(evt) || evt.key === 'ArrowUp') {
      evt.preventDefault();
      this.destroy();
    }
  };
}

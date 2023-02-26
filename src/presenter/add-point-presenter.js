import { remove, render, RenderPosition, replace } from '../framework/render';
import { isEscape } from '../utils/point-utils';
import { Mode, UpdateType, UserAction } from '../constants/constants';
import AddPointView from '../view/add-point-view';
import { nanoid } from 'nanoid';


export default class AddPointPresenter {
  #destinations = null;
  #offersByType = null;
  #destroyCallback = null;
  #container = null;
  #changeData = null;
  #addPointComponent = null;

  constructor(container, changeData) {
    this.#container = container;
    this.#changeData = changeData;
  }

  init = (destinations, offersByType, callback) => {
    this.#destinations = destinations;
    this.#offersByType = offersByType;
    this.#destroyCallback = callback;

    if (this.#addPointComponent !== null) {
      return;
    }

    // Создаём экземпляры компонентов
    this.#addPointComponent = new AddPointView(destinations, offersByType);
    this.#addPointComponent.setFormSubmitHandler(this.#formSubmitHandler);
    this.#addPointComponent.setButtonClickHandler(this.#cancelClickHandler);

    render(this.#addPointComponent, this.#container, RenderPosition.AFTEREND);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#addPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#addPointComponent);
    this.#addPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #formSubmitHandler = (update, destinations, offersByType) => {
    this.#changeData(UserAction.ADD_POINT, UpdateType.MINOR, { id: nanoid(), ...update }, destinations, offersByType);
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

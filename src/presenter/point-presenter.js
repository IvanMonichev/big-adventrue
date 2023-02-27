import PointItemView from '../view/point-item-view';
import EditPointView from '../view/edit-point-view';
import { remove, render, replace } from '../framework/render';
import { isEscape } from '../utils/point-utils';
import { Mode, UpdateType, UserAction } from '../constants/constants';


export default class PointPresenter {
  #mode = Mode.DEFAULT;
  #changeMode = null;
  #pointComponent = null;
  #destinations = null;
  #offersBtType = null;
  #editPointComponent = null;
  #container = null;
  #changeData = null;
  #point = null;

  constructor(container, changeData, changeMode) {
    this.#container = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, destinations, offersByType) => {
    this.#point = point;
    this.#destinations = destinations;
    this.#offersBtType = offersByType;

    const prevPontComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    // Создаём экземпляры компонентов
    this.#pointComponent = new PointItemView(point, destinations, offersByType);
    this.#editPointComponent = new EditPointView(point, destinations, offersByType);

    // Вешаем слушатели через колбэк
    this.#pointComponent.setButtonClickHandler(this.#editButtonClickHandler);
    this.#pointComponent.setFavoriteBtnClickHandler(this.#favoriteClickHandler);
    this.#editPointComponent.setButtonClickHandler(this.#closeButtonClickHandler);
    this.#editPointComponent.setFormSubmitHandler(this.#formSubmitHandler);
    this.#editPointComponent.setDeleteClickHandler(this.#deleteClickHandler);

    // Проверка на отсутствие элементов
    if (prevPontComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    // Проверка на наличие в DOM для оптимизации
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPontComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPontComponent);
    remove(prevEditPointComponent);
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  }

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true
      })
    }
  }

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      })
    }

    this.#editPointComponent.shake(resetFormState);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #editButtonClickHandler = () => {
    this.#replacePointToForm();
  };

  #closeButtonClickHandler = () => {
    this.#editPointComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };

  #formSubmitHandler = (point) => {
    this.#changeData(UserAction.UPDATE_POINT, UpdateType.MINOR, point);
  };

  #deleteClickHandler = (point) => {
    this.#changeData(UserAction.DELETE_POINT, UpdateType.MINOR, point);
  };

  #favoriteClickHandler = () => {
    this.#changeData(UserAction.UPDATE_POINT, UpdateType.MINOR, { ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #escKeyDownHandler = (evt) => {
    if (isEscape(evt) || evt.key === 'ArrowUp') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };
}

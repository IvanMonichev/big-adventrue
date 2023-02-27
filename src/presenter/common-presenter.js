import ListView from '../view/list-view';
import ListEmptyView from '../view/list-empty-view';
import PointPresenter from './point-presenter';
import { remove, render, RenderPosition } from '../framework/render';
import { sortPointsByPrice, sortPointsByTime } from '../utils/point-utils';
import SortingView from '../view/sorting-view';
import { FilterType, SortingType, UpdateType, UserAction } from '../constants/constants';
import { filter } from '../utils/filter-utils';
import AddPointPresenter from './add-point-presenter';
import LoadingMessageView from '../view/loading-message-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class CommonPresenter {
  #listEmptyComponent = null;
  #listViewComponent = new ListView();
  #loadingMessageComponent = new LoadingMessageView();
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);
  #sortingComponent = null;
  #pointsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offerByTypeModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #currentSortingType = SortingType.DAY;
  #filterType = FilterType.EVERYTHING;

  #addPointPresenter = null;
  #isLoading = true;

  constructor(pointsContainer, pointsModel, destinationsModel, offerByTypeModel, filterModel) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offerByTypeModel = offerByTypeModel;
    this.#filterModel = filterModel;

    this.#addPointPresenter = new AddPointPresenter(this.#listViewComponent.element, this.#viewActionHandler);

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);

  }

  init = () => {
    this.#renderPoints();
  };

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filterPoints = filter[filterType](points);

    switch (this.#currentSortingType) {
      case SortingType.TIME:
        return filterPoints.sort(sortPointsByTime);
      case SortingType.PRICE:
        return filterPoints.sort(sortPointsByPrice);
    }

    return filterPoints;
  }

  createPoint = (callback) => {
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#addPointPresenter.init(this.#pointsModel.points[0], this.#destinationsModel.destinations, this.#offerByTypeModel.offersByType, callback);
  };

  #viewActionHandler = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#addPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#addPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.#destinationsModel.destinations, this.#offerByTypeModel.offersByType);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderPoints();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList({resetSortingType: true});
        this.#renderPoints();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingMessageComponent);
        this.#renderPoints();
        break;
    }
  };

  #modeChangeHandler = () => {
    this.#addPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point, destinations, offersBtType) => {
    const pointPresenter = new PointPresenter(this.#listViewComponent.element, this.#viewActionHandler, this.#modeChangeHandler);
    pointPresenter.init(point, destinations, offersBtType);

    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderSorting = () => {
    this.#sortingComponent = new SortingView(this.#currentSortingType);
    this.#sortingComponent.setSortingTypeChangeHandler(this.#sortingTypeChangeHandler);
    render(this.#sortingComponent, this.#pointsContainer);
  };

  #renderList = () => {
    render(this.#listViewComponent, this.#pointsContainer);
  };

  #renderLoadingMessage = () => {
    render(this.#loadingMessageComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  };

  #renderEmptyList = () => {
    this.#listEmptyComponent = new ListEmptyView(this.#filterType);
    render(this.#listEmptyComponent, this.#pointsContainer);
  };

  #renderPoints = () => {
    if (this.#isLoading) {
      this.#renderLoadingMessage();
      return;
    }

    if (this.points.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderSorting();
      this.#renderList();
      this.points.forEach((point) => this.#renderPoint(point, this.#destinationsModel.destinations, this.#offerByTypeModel.offersByType));
    }
  };

  #sortingTypeChangeHandler = (sortingType) => {
    if (this.#currentSortingType === sortingType) {
      return;
    }

    this.#currentSortingType = sortingType;
    this.#clearPointList();
    this.#renderPoints();
  };

  // Метод для очистки списка элементов, установка метода сортировки по умолчанию
  #clearPointList ({resetSortingType = false} = {}) {
    this.#addPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortingComponent);
    remove(this.#loadingMessageComponent);

    if (this.#listEmptyComponent) {
      remove(this.#listEmptyComponent);
    }

    if (resetSortingType) {
      this.#currentSortingType = SortingType.DAY;
    }
  }
}

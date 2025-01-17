import Observable from '../framework/observable';
import { UpdateType } from '../constants/constants';


export default class PointsModel extends Observable {
  #commonApiService = null;
  #points = null;

  constructor(commonApiService) {
    super();
    this.#commonApiService = commonApiService;
  }

  init = async () => {
    try {
      const points = await this.#commonApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  };

  get points() {
    return this.#points;
  }

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#commonApiService.updatePoint(update);
      const updatePoint = this.#adaptToClient(response);
      this.#points = [...this.#points.slice(0, index), updatePoint, ...this.#points.slice(index + 1)];
      this._notify(updateType, updatePoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  };

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#commonApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  };

  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#commonApiService.deletePoint(update);
      this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  };

  #adaptToClient = (point) => {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point ['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point ['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };
}



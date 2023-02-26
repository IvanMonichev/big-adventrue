import Observable from '../framework/observable';
import { generatePoint } from '../mock/point-mock';
import { UpdateType } from '../constants/constants';


export default class PointsModel extends Observable {
  #commonApiService = null;
  #points = Array.from({length: 10}, generatePoint);

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

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [...this.#points.slice(0, index), update, ...this.#points.slice(index + 1)];

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [update, ...this.#points];

    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];
    this._notify(updateType, update);
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



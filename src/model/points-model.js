import Observable from '../framework/observable';
import { generatePoint } from '../mock/point-mock';


export default class PointsModel extends Observable {
  #taskApiService = null;
  #points = Array.from({length: 10}, generatePoint);
  constructor(taskApiService) {
    super();
    this.#taskApiService = taskApiService;
    this.#taskApiService.points.then((points) => console.log(points));

  }

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
}



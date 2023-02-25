import { generatePoint } from '../mock/point-mock';
import { generateOffersByType } from '../mock/offers-by-type-mock';
import { generateDestionation } from '../mock/destination-mock';
import Observable from '../framework/observable';


export default class PointsModel extends Observable {
  #points = Array.from({length: 10}, generatePoint);
  #destinations = Array.from({length: 20}, (_, index) => generateDestionation(index));
  #offersByType = generateOffersByType();

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offersByType() {
    return this.#offersByType;
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



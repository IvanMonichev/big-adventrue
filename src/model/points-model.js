import { generatePoint } from '../mock/point-mock';
import { generateOffersByType } from '../mock/offers-by-type-mock';
import { generateDestionation } from '../mock/destination-mock';


export default class PointsModel {
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
}



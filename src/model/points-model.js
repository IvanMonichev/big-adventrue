import { generatePoint, generateType } from '../mock/point-mock';
import { generateOffersByType } from '../mock/offers-by-type-mock';


export default class PointsModel {

  points = Array.from({length: 7}, (_, index) => generatePoint(index));
  offersByType = generateOffersByType();

  getPoints = () => this.points;
  getOffersByType = () => this.offersByType;
}



import { generatePoint } from '../mock/point';


export default class PointsModel {

  points = Array.from({length: 3}, (_, index) => generatePoint(index));

  getPoints = () => this.points;
}



import { buildPoint } from '../mock/point';


export default class PointsModel {

  points = Array.from({length: 3}, (_, index) => buildPoint(index));

  getPoints = () => this.points;
}



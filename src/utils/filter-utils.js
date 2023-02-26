import { FilterType } from '../constants/constants';
import { isPointFuture, isPointPast } from './point-utils';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.dateFrom)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom)),
};

export {
  filter
};

import dayjs from 'dayjs';

const formatDate = (date, format) => dayjs(date).format(format);

const isEscape = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');


const sortPointsByTime = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const isPointPast = (date) => dayjs(date).isBefore(dayjs(), 'D') || dayjs(date).isSame((dayjs(), 'D'));
const isPointFuture = (date) => dayjs(date).isAfter(dayjs(), 'D') || dayjs(date).isSame((dayjs(), 'D'));

export {
  formatDate,
  isEscape,
  sortPointsByTime,
  sortPointsByPrice,
  isPointPast,
  isPointFuture,
};

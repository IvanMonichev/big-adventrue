import dayjs from 'dayjs';

const formatDate = (date, format) => dayjs(date).format(format);

const isEscape = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');


const sortPointsByTime = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export {
  formatDate,
  isEscape,
  sortPointsByTime,
  sortPointsByPrice
};

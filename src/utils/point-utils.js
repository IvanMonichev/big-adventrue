import dayjs from 'dayjs';

const formatDate = (date, format) => dayjs(date).format(format);

const isEscape = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

/* Утилитарная функция для обновления конкретного элемента коллекции */
const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

const sortPointsByTime = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export {
  formatDate,
  isEscape,
  updateItem,
  sortPointsByTime,
  sortPointsByPrice
};

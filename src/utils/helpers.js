import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const formatDate = (date, format) => dayjs(date).format(format);

const isEscape = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

export {
  getRandomInteger,
  formatDate,
  isEscape
};

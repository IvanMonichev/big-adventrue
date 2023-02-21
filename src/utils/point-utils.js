import dayjs from 'dayjs';

const formatDate = (date, format) => dayjs(date).format(format);

const isEscape = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

export {
  formatDate,
  isEscape
};

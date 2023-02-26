import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../constants/constants';

const EmptyListMessageTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createListEmptyTemplate = (filterType) => {
  const EmptyListMessageText = EmptyListMessageTextType[filterType];
  return (`<p class="trip-events__msg">${EmptyListMessageText}</p>`);
};

export default class ListEmptyView extends AbstractView {
  #filterType = null;
  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmptyTemplate(this.#filterType);
  }
}

import { render, RenderPosition } from './utils/render';
import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import PointsPresenter from './presenter/points-presenter';
import { generatePoint } from './mock/point';
import { generateDescription } from './mock/destination';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const filterComponent = new FilterView();
const sortComponent = new SortView();
const pointsPresenter = new PointsPresenter();

render(filterComponent, filtersContainerElement, RenderPosition.BEFOREEND);
render(sortComponent, tripEventsElement, RenderPosition.BEFOREEND);
pointsPresenter.init(tripEventsElement);

console.log(generatePoint());

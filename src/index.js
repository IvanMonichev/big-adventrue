import { render, RenderPosition } from './framework/render';
import FilterView from './view/filter-view';
import PointsPresenter from './presenter/points-presenter';
import PointsModel from './model/points-model';

const filtersContainerElement = document.querySelector(
  '.trip-controls__filters'
);
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const pointsPresenter = new PointsPresenter(tripEventsElement, pointsModel);
const filterComponent = new FilterView();

render(filterComponent, filtersContainerElement, RenderPosition.BEFOREEND);

pointsPresenter.init();

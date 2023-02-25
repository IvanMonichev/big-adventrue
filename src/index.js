import PointsPresenter from './presenter/points-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const filterModel = new FilterModel();
const pointsModel = new PointsModel();
const pointsPresenter = new PointsPresenter(tripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);

filterPresenter.init();
pointsPresenter.init();

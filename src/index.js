import CommonPresenter from './presenter/common-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import OffersByTypeModel from './model/offers-by-type-model';
import DestinationModel from './model/destination-model';
import { generateDestionation } from './mock/destination-mock';
import { generateOffersByType } from './mock/offers-by-type-mock';
import { generatePoint } from './mock/point-mock';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const mockPoints = Array.from({length: 10}, generatePoint);
const mockDestinations = Array.from({length: 20}, (_, index) => generateDestionation(index));
const mockOffersByType = generateOffersByType();

const pointsModel = new PointsModel(mockPoints);
const destinationsModel = new DestinationModel(mockDestinations);
const offersByTypeModel = new OffersByTypeModel(mockOffersByType);
const filterModel = new FilterModel();

const commonPresenter = new CommonPresenter(tripEventsElement, pointsModel, destinationsModel, offersByTypeModel, filterModel);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);

filterPresenter.init();
commonPresenter.init();

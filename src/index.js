import CommonPresenter from './presenter/common-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import OffersByTypeModel from './model/offers-by-type-model';
import DestinationModel from './model/destination-model';
import { generateDestionation } from './mock/destination-mock';
import { generateOffersByType } from './mock/offers-by-type-mock';
import { generatePoint } from './mock/point-mock';
import AddPointBtnView from './view/add-point-btn-view';
import { render } from './framework/render';
import PointsApiService from './services/points-api-service';

const AUTHORIZATION = 'Basic WNSaG37gvlPQ';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const addPointButtonComponent = new AddPointBtnView();
const addPointButtonContainer = document.querySelector('.trip-main');

const mockDestinations = Array.from({length: 20}, (_, index) => generateDestionation(index));
const mockOffersByType = generateOffersByType();

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationModel(mockDestinations);
const offersByTypeModel = new OffersByTypeModel(mockOffersByType);
const filterModel = new FilterModel();

const commonPresenter = new CommonPresenter(tripEventsElement, pointsModel, destinationsModel, offersByTypeModel, filterModel);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);

const addPointFormClose = () => {
  addPointButtonComponent.element.disabled = false;
};

const addPointClickHandler = () => {
  commonPresenter.createPoint(addPointFormClose);
  addPointButtonComponent.element.disabled = true;
};

render(addPointButtonComponent, addPointButtonContainer);
addPointButtonComponent.setAddPointClickHandler(addPointClickHandler);

filterPresenter.init();
commonPresenter.init();

import CommonPresenter from './presenter/common-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import OffersByTypeModel from './model/offers-by-type-model';
import DestinationModel from './model/destination-model';
import AddPointBtnView from './view/add-point-btn-view';
import { render } from './framework/render';
import CommonApiService from './services/common-api-service';

const AUTHORIZATION = 'Basic WNSaG37gvlPQ';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const addPointButtonComponent = new AddPointBtnView();
const addPointButtonContainer = document.querySelector('.trip-main');

const commonApiService = new CommonApiService(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel(commonApiService);
const destinationsModel = new DestinationModel(commonApiService);
const offersByTypeModel = new OffersByTypeModel(commonApiService);
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

filterPresenter.init();
commonPresenter.init();
Promise.all([destinationsModel.init(), offersByTypeModel.init(), pointsModel.init()])
  .then(() => {
    render(addPointButtonComponent, addPointButtonContainer);
    addPointButtonComponent.setAddPointClickHandler(addPointClickHandler);
  });

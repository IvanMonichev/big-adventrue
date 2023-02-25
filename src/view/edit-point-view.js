import { formatDate } from '../utils/point-utils';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { isDemandElement } from '../utils/common-utils';

const createOffersTemplate = (type, offers, offersByType) => {
  const offersByCurrentType = offersByType.find((element) => element.type === type).offers;

  return offersByCurrentType.map(({ id, title, price }) => {
    const isChecked = offers.includes(id) ? 'checked' : '';

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-1" type="checkbox" name="event-offer-${title}" ${isChecked} data-offer-id="${id}">
        <label class="event__offer-label" for="event-offer-${title}-1">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  }).join('');
};

const createDestinationListTemplate = (destinations) => (
  destinations.map((destination) =>
    `<option value="${destination.name}"></option>`)
).join('');

const createEventTypeListTemplate = (offersByType, type) => {
  const eventTypes = offersByType.map((element) => element.type);

  return eventTypes.map((eventType) => (
    `<div class="event__type-item">
       <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio"
        name="event-type" value="${eventType}" ${eventType === type ? 'checked' : ''}>
       <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType}</label>
    </div>`
  )).join('');
};

const createEditPointTemplate = (point, destinations, offersByType) => {

  const { dateFrom, dateTo, basePrice, type, destination, offers } = point;
  const destinationName = destinations.find((item) => item.id === destination).name;
  const destinationDescription = destinations.find((item) => item.id === destination).description;

  return (
    `<li class="trip-events__item">
     <form class="event event--edit" action="#" method="post">
       <header class="event__header">
         <div class="event__type-wrapper">
           <label class="event__type  event__type-btn" for="event-type-toggle-1">
             <span class="visually-hidden">Choose event type</span>
             <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
           </label>
           <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
  
           <div class="event__type-list">
             <fieldset class="event__type-group">
               <legend class="visually-hidden">Event type</legend>
                ${createEventTypeListTemplate(offersByType, type)}
             </fieldset>
           </div>
         </div>
 
         <div class="event__field-group  event__field-group--destination">
           <label class="event__label  event__type-output" for="event-destination-1">
             ${type}
           </label>
           <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="${destinationName}" value="${destinationName}" list="destination-list-1">
           <datalist id="destination-list-1">
             ${createDestinationListTemplate(destinations)}
           </datalist>
         </div>
  
         <div class="event__field-group  event__field-group--time">
           <label class="visually-hidden" for="event-start-time-1">From</label>
           <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom, 'DD/MM/YY HH:mm')}">
           &mdash;
           <label class="visually-hidden" for="event-end-time-1">To</label>
           <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo, 'DD/MM/YY HH:mm')}">
         </div>
  
         <div class="event__field-group  event__field-group--price">
           <label class="event__label" for="event-price-1">
             <span class="visually-hidden">Price</span>
             &euro;
           </label>
           <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
         </div>
  
         <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
         <button class="event__reset-btn" type="reset">Delete</button>
         <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>
       </header>
       <section class="event__details">
         <section class="event__section  event__section--offers">
           <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  
           <div class="event__available-offers">
             ${createOffersTemplate(type, offers, offersByType)}
           </div>
         </section>
  
         <section class="event__section  event__section--destination">
           <h3 class="event__section-title  event__section-title--destination">Destination</h3>
           <p class="event__destination-description">${destinationDescription}</p>
         </section>
       </section>
       </form>
   </li>`
  );
};

export default class EditPointView extends AbstractStatefulView {
  #point = null;
  #destinations = null;
  #offersByType = null;

  constructor(point, destinations, offersByType) {
    super();
    this._state = EditPointView.parsePointToState(point);
    this.#point = point;
    this.#destinations = destinations;
    this.#offersByType = offersByType;

    this.#setInnerHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#destinations, this.#offersByType);
  }

  static parsePointToState = (point) => ({ ...point });

  static parseStateToPoint = (state) => ({ ...state });

  setButtonClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#buttonClickHandler);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.submitForm = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  reset = (point) => this.updateElement(EditPointView.parsePointToState(point));

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submitForm(EditPointView.parseStateToPoint(this._state));
  };

  #setInnerHandlers = () => {
    this.element.addEventListener('input', this.#offerChangeHandler);
    this.element.addEventListener('input', this.#pointTypeChangeHandler);
    this.element.addEventListener('input', this.#destinationChangeHandler);
  };

  #offerChangeHandler = (evt) => {

    // Используем делегирование событий
    if (!isDemandElement(evt, '.event__offer-checkbox')) {
      return;
    }

    evt.preventDefault();
    const stateOffers = [...this._state.offers];
    const numberId = Number(evt.target.dataset.offerId);

    if (evt.target.checked) {
      this.updateElement({ offers: [...stateOffers, numberId] });
    } else {
      this.updateElement({ offers: [...stateOffers.filter((item) => item !== numberId)] });
    }
  };

  #pointTypeChangeHandler = (evt) => {
    if (!isDemandElement(evt, '.event__type-input')) {
      return;
    }

    evt.preventDefault();
    this.updateElement({ type: evt.target.value });
  };

  #destinationChangeHandler = (evt) => {
    if (!isDemandElement(evt, '.event__input--destination')) {
      return;
    }

    evt.preventDefault();

    const findDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    this.updateElement({ destination: findDestination.id });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.submitForm);
    this.setButtonClickHandler(this._callback.click);
  };
}

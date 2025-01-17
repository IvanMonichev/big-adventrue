import { formatDate } from '../utils/point-utils';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { isDemandElement } from '../utils/common-utils';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createOffersTemplate = (type, offers, offersByType, isDisabled) => {
  const offersByCurrentType = offersByType.find((element) => element.type === type).offers;

  return offersByCurrentType.map(({ id, title, price }) => {
    const isChecked = offers.includes(id) ? 'checked' : '';

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-1" type="checkbox" name="event-offer-${title}" ${isChecked} data-offer-id="${id}" ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="event-offer-${title}-1">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  }).join('');
};

const createDestinationListTemplate = (destinations, isDisabled) => (
  destinations.map((destination) =>
    `<option value="${destination.name}" ${isDisabled ? 'disabled' : ''}></option>`)
).join('');

const createEventTypeListTemplate = (offersByType, type, isDisabled) => {
  const eventTypes = offersByType.map((element) => element.type);

  return eventTypes.map((eventType) => (
    `<div class="event__type-item" ${isDisabled ? 'disabled' : ''}>
       <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio"
        name="event-type" value="${eventType}" ${eventType === type ? 'checked' : ''}>
       <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType}</label>
    </div>`
  )).join('');
};

const createEditPointTemplate = (point, destinations, offersByType) => {
  const { dateFrom, dateTo, basePrice, type, destination, offers, isDisabled, isSaving, isDeleting } = point;
  const currentDestination = destinations.find((element) => element.name === destination.name);

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
                ${createEventTypeListTemplate(offersByType, type, isDisabled)}
             </fieldset>
           </div>
         </div>
 
         <div class="event__field-group  event__field-group--destination">
           <label class="event__label  event__type-output" for="event-destination-1">
             ${type}
           </label>
           <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="${currentDestination.name}" value="${currentDestination.name}" list="destination-list-1">
           <datalist id="destination-list-1">
             ${createDestinationListTemplate(destinations, isDisabled)}
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
           <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" required min="1">
         </div>
  
         <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
         <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
         <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>
       </header>
       <section class="event__details">
         <section class="event__section  event__section--offers">
           <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  
           <div class="event__available-offers">
             ${createOffersTemplate(type, offers, offersByType, isDisabled)}
           </div>
         </section>
  
         <section class="event__section  event__section--destination">
           <h3 class="event__section-title  event__section-title--destination">Destination</h3>
           <p class="event__destination-description">${currentDestination.description}</p>
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
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor(point, destinations, offersByType) {
    super();
    this._state = EditPointView.parsePointToState(point);
    this.#point = point;
    this.#destinations = destinations;
    this.#offersByType = offersByType;

    this.#setInnerHandlers();
    this.#setDatePickers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#destinations, this.#offersByType);
  }

  static parsePointToState = (point) => ({ ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  };

  setButtonClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#buttonClickHandler);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.submitForm = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  };

  reset = (point) => {
    this.updateElement(EditPointView.parsePointToState(point));
  };

  removeElement() {
    super.removeElement();
    if (this.#dateFromPicker || this.#dateToPicker) {
      this.#dateFromPicker.destroy();
      this.#dateToPicker.destroy();
      this.#dateFromPicker = null;
      this.#dateToPicker = null;
    }
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.submitForm);
    this.setButtonClickHandler(this._callback.click);
    this.#setDatePickers();
  };

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submitForm(EditPointView.parseStateToPoint(this._state), this.#destinations, this.#offersByType);
  };

  #setInnerHandlers = () => {
    this.element.addEventListener('change', this.#offerChangeHandler);
    this.element.addEventListener('change', this.#pointTypeChangeHandler);
    this.element.addEventListener('change', this.#destinationChangeHandler);
    this.element.addEventListener('input', this.#priceChangeHandler);
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

    if (findDestination) {
      this.updateElement({ destination: findDestination });
    }
  };

  #priceChangeHandler = (evt) => {
    if (!isDemandElement(evt, '.event__input--price')) {
      return;
    }

    evt.preventDefault();

    this.updateElement({basePrice: evt.target.value});
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #setDatePickers = () => {
    this.#dateFromPicker = flatpickr(this.element.querySelector('input[name="event-start-time"]'), {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      defaultDate: this._state.dateFrom,
      onChange: this.#dateFromChangeHandler
    });
    this.#dateToPicker = flatpickr(this.element.querySelector('input[name="event-end-time"]'), {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      defaultDate: this._state.dateTo,
      onChange: this.#dateToChangeHandler,
    });
  };

  #dateFromChangeHandler = ([ userDate ]) => this.updateElement({ dateFrom: userDate });
  #dateToChangeHandler = ([ userDate ]) => this.updateElement({ dateTo: userDate });
}

import { formatDate } from '../utils/point-utils';
import AbstractView from '../framework/view/abstract-view';

const createOffersTemplate = (type, offers, offersByType) => {
  const offersByCurrentType = offersByType.find((element) => element.type === type).offers;

  return offersByCurrentType.map(({ id, title, price }) => {
    const isChecked = offers.includes(id) ? 'checked' : '';

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-1" type="checkbox" name="event-offer-${title}" ${isChecked}>
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

const createEventTypeListTemplate = (offersByType) => {
  const eventTypes = offersByType.map((element) => element.type);

  return eventTypes.map((type) => (
    `<div class="event__type-item">
       <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
       <label class="event__type-label  event__type-label--${type}" for="event-type-taxi-1">${type}</label>
    </div>`
  )).join('');
};

const createEditPointTemplate = (points, destinations, offersByType) => {

  const { dateFrom, dateTo, basePrice, type, destination, offers } = points;
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
                ${createEventTypeListTemplate(offersByType)}
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

export default class EditPointView extends AbstractView{
  #points = null;
  #destinations = null;
  #offersByType = null;

  constructor(points, destinations, offersByType) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offersByType = offersByType;
  }

  get template() {
    return createEditPointTemplate(this.#points, this.#destinations, this.#offersByType);
  }

  setButtonClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#buttonClickHandler);
  };

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setFormSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit();
  };
}

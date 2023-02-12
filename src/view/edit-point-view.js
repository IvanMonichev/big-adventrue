import { createElement } from '../utils/render';

const createEditPointTemplate = () => (
  '            <li class="trip-events__item">\n' +
  '              <form class="event event--edit" action="#" method="post">\n' +
  '                <header class="event__header">\n' +
  '                  <div class="event__type-wrapper">\n' +
  '                    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n' +
  '                      <span class="visually-hidden">Choose event type</span>\n' +
  '                      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">\n' +
  '                    </label>\n' +
  '                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n' +
  '\n' +
  '                    <div class="event__type-list">\n' +
  '                      <fieldset class="event__type-group">\n' +
  '                        <legend class="visually-hidden">Event type</legend>\n' +
  '\n' +
  '                        <div class="event__type-item">\n' +
  '                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n' +
  '                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <div class="event__type-item">\n' +
  '                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">\n' +
  '                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <div class="event__type-item">\n' +
  '                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n' +
  '                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <div class="event__type-item">\n' +
  '                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n' +
  '                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <div class="event__type-item">\n' +
  '                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n' +
  '                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <div class="event__type-item">\n' +
  '                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>\n' +
  '                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <div class="event__type-item">\n' +
  '                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n' +
  '                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <div class="event__type-item">\n' +
  '                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n' +
  '                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <div class="event__type-item">\n' +
  '                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n' +
  '                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n' +
  '                        </div>\n' +
  '                      </fieldset>\n' +
  '                    </div>\n' +
  '                  </div>\n' +
  '\n' +
  '                  <div class="event__field-group  event__field-group--destination">\n' +
  '                    <label class="event__label  event__type-output" for="event-destination-1">\n' +
  '                      Flight\n' +
  '                    </label>\n' +
  '                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">\n' +
  '                    <datalist id="destination-list-1">\n' +
  '                      <option value="Amsterdam"></option>\n' +
  '                      <option value="Geneva"></option>\n' +
  '                      <option value="Chamonix"></option>\n' +
  '                    </datalist>\n' +
  '                  </div>\n' +
  '\n' +
  '                  <div class="event__field-group  event__field-group--time">\n' +
  '                    <label class="visually-hidden" for="event-start-time-1">From</label>\n' +
  '                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">\n' +
  '                    &mdash;\n' +
  '                    <label class="visually-hidden" for="event-end-time-1">To</label>\n' +
  '                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">\n' +
  '                  </div>\n' +
  '\n' +
  '                  <div class="event__field-group  event__field-group--price">\n' +
  '                    <label class="event__label" for="event-price-1">\n' +
  '                      <span class="visually-hidden">Price</span>\n' +
  '                      &euro;\n' +
  '                    </label>\n' +
  '                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">\n' +
  '                  </div>\n' +
  '\n' +
  '                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n' +
  '                  <button class="event__reset-btn" type="reset">Delete</button>\n' +
  '                  <button class="event__rollup-btn" type="button">\n' +
  '                    <span class="visually-hidden">Open event</span>\n' +
  '                  </button>\n' +
  '                </header>\n' +
  '                <section class="event__details">\n' +
  '                  <section class="event__section  event__section--offers">\n' +
  '                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n' +
  '\n' +
  '                    <div class="event__available-offers">\n' +
  '                      <div class="event__offer-selector">\n' +
  '                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>\n' +
  '                        <label class="event__offer-label" for="event-offer-luggage-1">\n' +
  '                          <span class="event__offer-title">Add luggage</span>\n' +
  '                          &plus;&euro;&nbsp;\n' +
  '                          <span class="event__offer-price">50</span>\n' +
  '                        </label>\n' +
  '                      </div>\n' +
  '\n' +
  '                      <div class="event__offer-selector">\n' +
  '                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>\n' +
  '                        <label class="event__offer-label" for="event-offer-comfort-1">\n' +
  '                          <span class="event__offer-title">Switch to comfort</span>\n' +
  '                          &plus;&euro;&nbsp;\n' +
  '                          <span class="event__offer-price">80</span>\n' +
  '                        </label>\n' +
  '                      </div>\n' +
  '\n' +
  '                      <div class="event__offer-selector">\n' +
  '                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">\n' +
  '                        <label class="event__offer-label" for="event-offer-meal-1">\n' +
  '                          <span class="event__offer-title">Add meal</span>\n' +
  '                          &plus;&euro;&nbsp;\n' +
  '                          <span class="event__offer-price">15</span>\n' +
  '                        </label>\n' +
  '                      </div>\n' +
  '\n' +
  '                      <div class="event__offer-selector">\n' +
  '                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">\n' +
  '                        <label class="event__offer-label" for="event-offer-seats-1">\n' +
  '                          <span class="event__offer-title">Choose seats</span>\n' +
  '                          &plus;&euro;&nbsp;\n' +
  '                          <span class="event__offer-price">5</span>\n' +
  '                        </label>\n' +
  '                      </div>\n' +
  '\n' +
  '                      <div class="event__offer-selector">\n' +
  '                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">\n' +
  '                        <label class="event__offer-label" for="event-offer-train-1">\n' +
  '                          <span class="event__offer-title">Travel by train</span>\n' +
  '                          &plus;&euro;&nbsp;\n' +
  '                          <span class="event__offer-price">40</span>\n' +
  '                        </label>\n' +
  '                      </div>\n' +
  '                    </div>\n' +
  '                  </section>\n' +
  '\n' +
  '                  <section class="event__section  event__section--destination">\n' +
  '                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n' +
  '                    <p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.</p>\n' +
  '                  </section>\n' +
  '                </section>\n' +
  '              </form>\n' +
  '            </li>'
)

export default class EditPointView {
  getTemplate() {
    return createEditPointTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

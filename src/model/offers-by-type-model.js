import Observable from '../framework/observable';

export default class OffersByTypeModel extends Observable {
  #offersByType = null;
  constructor(offersByType) {
    super();
    this.#offersByType = offersByType;
  }

  get offersByType() {
    return this.#offersByType;
  }

}

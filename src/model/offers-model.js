import { generateOffers } from '../mock/offers';


export default class OffersModel {

  offers = Array.from({length: 40}, (_, index) => generateOffers(index));

  getOffers = () => this.offers;
}



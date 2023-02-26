import Observable from '../framework/observable';
import { UpdateType } from '../constants/constants';

export default class OffersByTypeModel extends Observable {
  #commonApiService = null;
  #offersByType = null;

  constructor(commonApiService) {
    super();
    this.#commonApiService = commonApiService;
  }

  init = async () => {
    try {
      this.#offersByType = await this.#commonApiService.offersByType;
    } catch (err) {
      this.#offersByType = [];
    }

    this._notify(UpdateType.INIT);
  };

  get offersByType() {
    return this.#offersByType;
  }

}

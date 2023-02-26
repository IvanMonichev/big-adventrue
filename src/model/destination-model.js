import Observable from '../framework/observable';
import { UpdateType } from '../constants/constants';

export default class DestinationModel extends Observable {
  #commonApiService = null;
  #destinations = null;

  constructor(commonApiService) {
    super();
    this.#commonApiService = commonApiService;
  }

  init = async () => {
    try {
      this.#destinations = await this.#commonApiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  };

  get destinations() {
    return this.#destinations;
  }

}



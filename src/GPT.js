import CompanionAdsService from './CompanionAdsService';
import ContentService from './ContentService';
import PubAdsService from './PubAdsService';
import Slot from './Slot';
import SizeMappingBuilder from './SizeMappingBuilder';
import CommandArray from './CommandArray';

/**
 * This is the global namespace that the {@link GPT} uses for its API.
 *
 * For details on this API, see https://developers.google.com/doubleclick-gpt/reference.
 *
 * Note that the recommended way of handling async is to use {@link GPT#cmd} to
 * queue callbacks for when {@link GPT} is ready. These callbacks do not have to check
 * {@link GPT#apiReady} as they are guaranteed to execute once the API is set up.
 *
 * The {@link GPT#cmd} variable is initialized to an empty JavaScript array by
 * the GPT tag syntax on the page, and cmd.push is the standard Array.push
 * method that adds an element to the end of the array. When the {@link GPT} JavaScript
 * is loaded, it looks through the array and executes all the functions in
 * order. The script then replaces cmd with a {@link CommandArray} object
 * whose push method is defined to execute the function argument passed to it.
 * This mechanism allows {@link GPT} to reduce perceived latency by fetching the
 * JavaScript asynchronously while allowing the browser to continue rendering
 * the page.
 *
 * @example
 * import GPT from 'gpt-mock';
 *
 * googletag = new GPT();
 * googletag.cmd.push(function() {
 *   googletag.defineSlot('/Test/12345', [728, 90], 'gpt-div-1').addService(googletag.pubads());
 * });
 *
 * googletag.cmd.push(function() {
 *   googletag.display('gpt-div-1');
 * });
 *
 * // Vitally, you need to tell the library that it has loaded so the commands
 * // will be executed.
 * googletag._loaded();
 */
export default class GPT {
  /**
   * Creates a new GPT instance.
   *
   * @param {number} version The version to emulate.
   */
  constructor(version = 94) {
    /**
     * Flag indicating that {@link GPT} API is loaded and ready to be called.
     * This property will be simply undefined until the API is ready.
     *
     * @type {boolean|undefined}
     */
    this.apiReady = void 0;

    /**
     * Flag indicating that {@link PubAdsService} is enabled, loaded and fully
     * operational.
     *
     * This property will be simply `undefined` until {@link GPT#enableServices()}
     * is called and {@link PubAdsService} is loaded and initialized.
     *
     * @type {boolean|undefined}
     */
    this.pubadsReady = void 0;

    /**
     * Reference to the global command queue for asynchronous execution of
     * {@link GPT}-related calls.
     *
     * @type {!Array<function()>|!CommandArray}
     */
    this.cmd = [];
    this._version = version;
    this._slots = [];
    this._slotCounter = 0;
    this._services = {};
    this._addService(new CompanionAdsService(this));
    this._addService(new ContentService(this));
    this._addService(new PubAdsService(this));
    this._title = null;
    this.enums = {
      OutOfPageFormat: {
        2: 'TOP_ANCHOR',
        3: 'BOTTOM_ANCHOR',
        4: 'REWARDED',
        5: 'INTERSTITIAL',
        REWARDED: 4,
        TOP_ANCHOR: 2,
        BOTTOM_ANCHOR: 3,
        INTERSTITIAL: 5
      },
      TrafficSource: {
        1: 'PURCHASED',
        2: 'ORGANIC',
        PURCHASED: 1,
        ORGANIC: 2
      }
    };
  }

  /**
   * Returns the current version of {@link GPT}.
   *
   * @returns {string} Version string.
   */
  getVersion() {
    return `${this._version}`;
  }

  /**
   * Returns a reference to the {@link CompanionAdsService}.
   *
   * @returns {CompanionAdsService} Instance of the {@link CompanionAdsService}.
   */
  companionAds() {
    return this._services[CompanionAdsService._name];
  }

  /**
   * Returns a reference to the {@link ContentService}.
   *
   * @returns {ContentService} Instance of the {@link ContentService}.
   */
  content() {
    return this._services[ContentService._name];
  }

  /**
   * Returns a reference to the {@link PubAdsService}.
   *
   * @returns {PubAdsService} Instance of the {@link PubAdsService}.
   */
  pubads() {
    return this._services[PubAdsService._name];
  }

  /**
   * Enables all {@link GPT} services that have been defined for ad slots on the page.
   */
  enableServices() {
    for (let service in this._services) {
      if (this._services.hasOwnProperty(service)) {
        this._services[service].enable();
      }
    }
  }

  /**
   * Creates a new {@link SizeMappingBuilder}.
   *
   * @returns {SizeMappingBuilder} A new builder.
   */
  sizeMapping() {
    return new SizeMappingBuilder();
  }

  /**
   * Constructs an ad slot with a given ad unit path and size and associates it
   * with the ID of a div element on the page that will contain the ad.
   *
   * @param {string} adUnitPath Full path of the ad unit with the network code and unit code.
   * @param {GeneralSize} size Width and height of the added slot. This is the
   * size that is used in the ad request if no responsive size mapping is provided
   * or the size of the viewport is smaller than the smallest size provided in the mapping.
   * @param {string} [optDiv] ID of the div that will contain this ad unit.
   * @returns {Slot} The newly created slot.
   */
  defineSlot(adUnitPath, size, optDiv) {
    this._slotCounter += 1;
    return this._addSlot(new Slot(adUnitPath, size, optDiv, this._slotCounter));
  }

  /**
   * Constructs an out-of-page (interstitial) ad slot with the given ad unit path.
   * optDiv is the ID of the div element that will contain the ad.
   *
   * @param {string} adUnitPath Full path of the ad unit with the network code and ad unit code.
   * @param {string} [optDiv] ID of the div that will contain this ad unit.
   * @returns {Slot} The newly created slot.
   */
  defineOutOfPageSlot(adUnitPath, optDiv) {
    this._slotCounter += 1;
    const slot = new Slot(adUnitPath, [], optDiv, this._slotCounter);
    slot._outOfPage = true;
    return this._addSlot(slot);
  }

  /**
   * Destroys the given slots, removes all related objects and references of
   * given slots from {@link GPT}. This API does not support passback slots and
   * companion slots. Calling this API clears the ad and removes the slot object
   * from the internal state maintained by {@link GPT}. Calling any more functions on
   * that slot object will result in undefined behaviour. Note the browser may
   * still not free the memory associated with that slot if a reference to it is
   * maintained by the publisher page. Calling this API makes the div associated
   * with that slot available for reuse.
   *
   * @param {Array<!Slot>} [optSlots] The array of slots to
   * destroy. Array is optional; all slots will be destroyed if it is unspecified.
   * @returns {boolean} true if slots have been destroyed, false otherwise.
   */
  destroySlots(optSlots) {
    for (let slot of optSlots || this._slots) {
      const i = this._slots.indexOf(slot);
      if (i !== -1) {
        slot._removeServices();
        this._removeSlot(slot);
      } else {
        return false;
      }
    }

    return true;
  }

  /**
   * Instructs slot services to render the slot. Each ad slot should only be
   * displayed once per page. All slots must be defined and have a service
   * associated with them before being displayed. The display call must not
   * happen until the element is present in the DOM. The usual way to achieve
   * that is to place it within a script block within the div element named in
   * the method call.
   *
   * If single request architecture (SRA) is being used, all unfetched ad slots
   * at the moment display is called will be fetched in a single instance of
   * {@link GPT#display}. To force an ad slot not to display, the entire div
   * must be removed.
   *
   * @param {string} div ID of the div element containing the ad slot.
   */
  display(div) {
    if (div) {
      for (let slot of this._slots) {
        if (slot.getSlotElementId() === div) {
          slot.display();
          return;
        }
      }
    }
  }

  /**
   * Opens the Console.
   */
  openConsole() {}

  /**
   * Disables the Console.
   */
  disablePublisherConsole() {}

  /**
   * Sets that title for all ad container iframes created by {@link PubAdsService},
   * from this point onwards.
   *
   * @param {string} title The title to set.
   */
  setAdIframeTitle(title) {
    this._title = title;
  }

  /**
   * Adds the given {@link Service}.
   *
   * @private
   * @param {Service} service The service to add
   * @returns {Service} The service added
   */
  _addService(service) {
    this._services[service.getName()] = service;
    return service;
  }

  /**
   * Adds the given {@link Slot}.
   *
   * @private
   * @param {Slot} slot The {@link Slot} to add.
   * @returns {Slot} The {@link Slot} added.
   */
  _addSlot(slot) {
    if (this._slots.indexOf(slot) === -1) {
      this._slots.push(slot);
    }
    return slot;
  }

  /**
   * Removes the given {@link Slot}.
   *
   * @private
   * @param {Slot} slot The {@link Slot} to remove.
   */
  _removeSlot(slot) {
    const index = this._slots.indexOf(slot);
    if (index !== -1) {
      this._slots.splice(index, 1);
    }
  }

  /**
   * Tells the {@link GPT} service that it has finished loading.  This method
   * MUST be called in order for most of the rest of the library to function.
   *
   * @public
   */
  _loaded() {
    if (!this.apiReady) {
      this.apiReady = true;
      this.cmd = new CommandArray(this.cmd);
    }
  }
}

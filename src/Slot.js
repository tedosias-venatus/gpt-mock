import * as GeneralSize from './GeneralSize';
import * as SizeMappingArray from './SizeMappingArray';
import ImpressionViewableEvent from './events/ImpressionViewableEvent';
import SlotOnloadEvent from './events/SlotOnloadEvent';
import SlotRenderEndedEvent from './events/SlotRenderEndedEvent';
import SlotVisibilityChangedEvent from './events/SlotVisibilityChangedEvent';
import SlotId from './SlotId';
import TargetingMap from './TargetingMap';

/**
 * Slot is an object representing single ad slot on a page.
 */
export default class Slot {
  /**
   * Creates a new {@link Slot}.
   *
   * @param {string} adUnitPath Full path of the ad unit with the network code and unit code.
   * @param {GeneralSize} [size] Width and height of the added slot. This is the
   * size that is used in the ad request if no responsive size mapping is provided
   * or the size of the viewport is smaller than the smallest size provided in the mapping.
   * @param {string} [optDiv] ID of the div that will contain this ad unit.
   * @param {number} [instance = 0] The instance count of the slot.
   */
  constructor(adUnitPath, size, optDiv, instance = 0) {
    this._id = new SlotId(adUnitPath, instance, optDiv);
    const mock = window.googletag.slotMock[adUnitPath] || null;
    const mockSize = mock && mock.size;
    this._sizes = GeneralSize.toSizes(mockSize || size);
    this._services = [];
    this._categoryExclusions = [];
    this._targeting = new TargetingMap();
    this._attributes = {};
    this._clickUrl = null;
    this._responseInformation = mock || null;
    this._sizeMapping = null;
    this._options = {
      content: null,
      refreshed: 0,
      displayed: false,
      fetched: false,
      passback: false,
      outOfPage: false,
      forceSafeFrame: false,
      safeFrameConfig: null,
      collapseEmptyDiv: false,
      collapseBeforeAdFetch: false
    };
  }

  /**
   * Returns the name of the slot
   *
   * @experimental
   * @returns {string} Ad unit path.
   */
  getName() {
    return this._id.getName();
  }

  /**
   * Returns the instance of the {@link Slot}.
   *
   * @experimental
   * @returns {number} The instance
   */
  getDefinedId() {
    return this._id.getInstance();
  }

  /**
   * Returns the full path of the ad unit, with the network code and ad unit path.
   *
   * @returns {string} Ad unit path.
   */
  getAdUnitPath() {
    return this._id.getAdUnitPath();
  }

  /**
   * Returns the id of the slot element provided when the {@link Slot} was defined.
   *
   * @returns {string} Slot element id.
   */
  getSlotElementId() {
    return this._id.getDomId();
  }

  /**
   * Returns the enabled services.
   *
   * @experimental
   * @returns {Array<Service>} The list of enabled services.
   */
  getServices() {
    return this._services.slice(0);
  }

  /**
   * Returns the sizes.
   *
   * @experimental
   * @returns {Array<GeneralSize>} The list of sizes.
   */
  getSizes() {
    return this._sizes.slice(0);
  }

  /**
   * Returns a flag indicating whether the {@link Slot} is out of the page.
   *
   * @experimental
   * @returns {boolean}
   */
  getOutOfPage() {
    return this._options.outOfPage;
  }

  /**
   * Initiates rendering of this slot.
   */
  display() {
    if (!this._options.displayed) {
      this.fetchStarted();
      this.fetchEnded();
      this.loaded();
      this.renderStarted();
      this.renderEnded();

      this.impressionViewable();
      this.visibilityChanged(100);
    }
  }

  /**
   * Returns the list of attribute keys set on this slot. If you intend to see
   * the keys of service-level attributes inherited by this {@link Slot}, you have to
   * use the {@link PubAdsService#getAttributeKeys} API.
   *
   * @returns {!Array<string>} Array of attribute keys. Ordering is undefined.
   */
  getAttributeKeys() {
    return Object.keys(this._attributes);
  }

  /**
   * Returns the value for the AdSense attribute associated with the given key.
   * Note that if you intend to see service-level attributes inherited by this
   * slot, you have to use the {@link PubAdsService#get} API.
   *
   * @param {string} key Name of the attribute to look for.
   * @returns {?string} Current value for the attribute key, or null if the key
   * is not present.
   */
  get(key) {
    return this._attributes[key] || null;
  }

  /**
   * Sets a value for an AdSense attribute on a particular ad slot. This will
   * override any values set at the service level for this key. See the AdSense
   * Attributes for a list of available keys and values. Calling this method
   * more than once for the same key will override previously set values for
   * that key. All values must be set before any display call.
   *
   * @param {string} key The name of the attribute.
   * @param {string} value Attribute value.
   * @returns {Slot} The {@link Slot} object on which the method was called.
   */
  set(key, value) {
    this._attributes[key] = value;
    return this;
  }

  /**
   * Return the attribute map.
   *
   * @private
   * @returns {Object<string, string>} The attribute map
   */
  _getAttributes() {
    return Object.assign({}, this._attributes);
  }

  /**
   * Returns a specific custom targeting parameter set on this slot.
   * Service-level targeting parameters are not included.
   *
   * @param {string} key The targeting key to look for.
   * @returns {!Array<string>} The values associated with this key, or an empty
   * array if there is no such key.
   */
  getTargeting(key) {
    return this._targeting.get(key);
  }

  /**
   * Sets a custom targeting parameter for this slot. Calling this method
   * multiple times for the same key will overwrite old values. Values set here
   * will overwrite targeting parameters set on service level. These keys are
   * defined in your {@link DFP} account.
   *
   * @param {string} key Targeting parameter key.
   * @param {string|!Array<string>} value Targeting parameter value or array of values.
   * @returns {Slot} The {@link Slot} object on which the method was called.
   */
  setTargeting(key, value) {
    this._targeting.set(key, value);
    return this;
  }

  /**
   * Returns the list of all custom targeting keys set on this slot. Service-level
   * targeting keys are not included.
   *
   * @returns {!Array<string>} Array of targeting keys. Ordering is undefined.
   */
  getTargetingKeys() {
    return this._targeting.keys();
  }

  /**
   * Returns the current targeting key-value dictionary.
   *
   * @experimental
   * @returns {Object<string, Array<string>>} the targeting map.
   */
  getTargetingMap() {
    return this._targeting.all();
  }

  /**
   * Clears all custom slot-level targeting parameters for this slot.
   *
   * @returns {Slot} The {@link Slot} object on which the method was called.
   */
  clearTargeting() {
    this._targeting.clear();
    return this;
  }

  /**
   * Sets custom targeting parameters for this passback slot, from a key:value
   * map in a JSON object. A badly formatted input will be rejected. This is the
   * same as calling @{link Slot#setTargeting} for all the key values
   * of the object. In case of overwriting, only the last value will be kept.
   * Values set here will overwrite targeting parameters set on service level.
   * These keys are defined in your {@link DFP} account.
   *
   * @param {Object<string,string|!Array<string>>} map Targeting parameter key:value map.
   * @returns {Slot} The {@link Slot} object on which the method was called.
   */
  updateTargetingFromMap(map) {
    for (let key in map) {
      if (map.hasOwnProperty(key)) {
        this.setTargeting(key, map[key]);
      }
    }
    return this;
  }

  /**
   * Adds a service to this slot.
   *
   * @param {Service} service The service to be added.
   * @returns {Slot} The {@link Slot} object on which the method was called.
   */
  addService(service) {
    if (this._services.indexOf(service) === -1) {
      this._services.push(service);
      service._addSlot(this);
    }
    return this;
  }

  /**
   * Removes all of the services from the slot.
   *
   * @private
   */
  _removeServices() {
    for (let service of this._services) {
      service._removeSlot(this);
    }

    this._services = [];
  }

  /**
   * Returns the ad category exclusion labels for this slot.
   *
   * @returns {!Array<string>} The ad category exclusion labels for this slot.
   */
  getCategoryExclusions() {
    return this._categoryExclusions.slice(0);
  }

  /**
   * Sets a slot-level ad category exclusion label on this slot.
   *
   * @param {string} categoryExclusion The ad category exclusion label to add.
   * @returns {Slot} The {@link Slot} object on which the method was called.
   */
  setCategoryExclusion(categoryExclusion) {
    this._categoryExclusions.push(categoryExclusion);
    return this;
  }

  /**
   * Clears all slot-level ad category exclusion labels for this slot.
   *
   * @returns {Slot} The {@link Slot} object on which the method was called.
   */
  clearCategoryExclusions() {
    this._categoryExclusions = [];
    return this;
  }

  /**
   * Sets an array of mappings from a minimum viewport size to slot size for this slot.
   *
   * @param {!SizeMappingArray} sizeMapping Array of size mappings. You can use
   * {@link SizeMappingBuilder} to create it. Each size mapping is an array of two elements:
   * {@link SingleSizeArray} and {@link GeneralSize}.
   * @returns {Slot} The {@link Slot} object on which the method was called.
   * @throws {Error} Size mapping has to be an array
   */
  defineSizeMapping(sizeMapping) {
    if (!SizeMappingArray.isSizeMappingArray(sizeMapping)) {
      throw Error('Size mapping has to be an array');
    }

    this._sizeMapping = sizeMapping;

    return this;
  }

  /**
   * Sets the click URL to which users will be redirected after clicking on the
   * ad. The {@link DFP} servers still record a click even if the click URL is replaced,
   * but any landing page URL associated with the creative that is served is
   * overridden. Subsequent calls overwrite the value. This works only for
   * non-SRA requests
   *
   * @param {string} value The click URL to set.
   * @returns {Slot} The slot object on which the method was called.
   */
  setClickUrl(value) {
    this._clickUrl = value;
    return this;
  }

  /**
   * Gets the click URL.
   *
   * @experimental
   * @returns {?string} The click URL
   */
  getClickUrl() {
    return this._clickUrl;
  }

  /**
   * Returns the ad response information. This is based on the last ad response
   * for the slot. If this is called when the slot has no ad, null will be
   * returned.
   *
   * @returns {?ResponseInformation}
   */
  getResponseInformation() {
    return this._responseInformation;
  }

  /**
   * Sets whether the slot div should be hidden when there is no ad in the slot.
   * This overrides the service-level settings.
   *
   * @param {boolean} collapse Whether to collapse the slot if no ad is returned.
   * @param {boolean} [optCollapseBeforeAdFetch] Whether to collapse the slot
   * even before an ad is fetched. Ignored if collapse is not true.
   * @returns {Slot} The {@link Slot} object on which the method was called.
   */
  setCollapseEmptyDiv(collapse, optCollapseBeforeAdFetch) {
    this._options.collapseEmptyDiv = collapse;
    if (collapse) {
      this._options.collapseBeforeAdFetch = optCollapseBeforeAdFetch;
    }
    return this;
  }

  /**
   * Returns whether the slot div should be hiddne when there is no ad in the slot.
   *
   * @experimental
   * @returns {boolean} true to collapse the slot if no ad is returned.
   */
  getCollapseEmptyDiv() {
    return this._options.collapseEmptyDiv;
  }

  /**
   * Configures whether ads in this slot should be forced to be rendered using
   * a SafeFrame container
   *
   * @param {boolean} forceSafeFrame true to force all ads in this slot to be
   * rendered in SafeFrames and false to opt-out of a page-level setting (if
   * present). Setting this to false when not specified at page-level, won't
   * change anything.
   * @returns {Slot} The {@link Slot} object on which the method was called.
   */
  setForceSafeFrame(forceSafeFrame) {
    this._options.forceSafeFrame = forceSafeFrame;
    return this;
  }

  /**
   * Sets the slot-level preferences for SafeFrame configuration. Any unrecognized
   * keys in the config object will be ignored. The entire config will be ignored
   * if an invalid value is passed for a recognized key. These slot level
   * preferences, if specified, will override any page level preferences.
   *
   * @param {SafeFrameConfig} config The configuration object.
   * @returns {Slot} The {@link Slot} object on which the method was called.
   */
  setSafeFrameConfig(config) {
    this._options.safeFrameConfig = config;
    return this;
  }

  /**
   * Informs the {@link Slot} that its fetch has started.
   *
   * @experimental
   */
  fetchStarted() {
    this._options.fetched = false;
  }

  /**
   * Informs the {@link Slot} that its fetch has finished.
   *
   * @experimental
   */
  fetchEnded() {
    this._options.fetched = true;
  }

  /**
   * Informs the {@link Slot} that it has been loaded.
   *
   * @experimental
   * @emits {SlotOnloadEvent}
   */
  loaded() {
    for (let service of this._services) {
      const event = new SlotOnloadEvent(service.getName(), this);
      service._fireEvent(event._name, event);
    }
  }

  /**
   * Informs the {@link Slot} that its rendering has started.
   *
   * @experimental
   */
  renderStarted() {
    this._options.displayed = false;
  }

  /**
   * Informs the {@link Slot} that its rendering has finished.
   *
   * @experimental
   * @param {?ResponseInformation} [responseInformation] The response information.
   * @emits {SlotRenderEndedEvent}
   */
  renderEnded(responseInformation) {
    this._responseInformation =
      responseInformation || this._responseInformation;
    this._options.displayed = true;

    const size = this.getSizes()[0];

    for (let service of this._services) {
      let event;

      if (this._responseInformation != null) {
        event = new SlotRenderEndedEvent(
          service.getName(),
          this,
          this._responseInformation.creativeId,
          this._responseInformation.lineItemId,
          false,
          [size.getWidth(), size.getHeight()]
        );
      } else {
        event = new SlotRenderEndedEvent(
          service.getName(),
          this,
          null,
          null,
          true,
          [size.getWidth(), size.getHeight()]
        );
      }

      service._fireEvent(event._name, event);
    }
  }

  /**
   * Notifies the {@link Slot} that it's impression is viewable.
   *
   * @emits {ImpressionViewableEvent}
   */
  impressionViewable() {
    for (let service of this._services) {
      const event = new ImpressionViewableEvent(service.getName(), this);

      service._fireEvent(event._name, event);
    }
  }

  /**
   * Notifies the {@link Slot} of its in view percentage.
   *
   * @param {number} inViewPercentage The percentage (0-100) of the ad's area that is visible.
   * @emits {SlotVisibilityChangedEvent}
   */
  visibilityChanged(inViewPercentage) {
    if (this._options.inViewPercentage !== inViewPercentage) {
      this._options.inViewPercentage = inViewPercentage;
      for (let service of this._services) {
        const event = new SlotVisibilityChangedEvent(
          service.getName(),
          this,
          inViewPercentage
        );
        service._fireEvent(event._name, event);
      }
    }
  }

  /**
   * Refreshes the {@link Slot}.
   *
   * @private
   */
  _refresh() {
    this._options.refreshed += 1;

    this.fetchStarted();
    this.fetchEnded();
    this.loaded();
    this.renderStarted();
    this.renderIframe();
    this.renderEnded();

    this.impressionViewable();
    this.visibilityChanged(100);
  }

  /**
   * Clears the {@link Slot}.
   *
   * @private
   */
  _clear() {
    this._options.content = null;
    this._options.fetched = false;
  }

  /**
   * Sets the content of the {@link Slot}.
   *
   * @private
   * @param {?string} content The content to set; or null to clear the content.
   */
  _setContent(content) {
    this._options.content = content;
  }

  /**
   * Gets the content of the slot {@link Slot}.
   *
   * @private
   * @returns {?string} The content of the slot; or null if the slot has no content.
   */
  _getContent() {
    return this._options.content;
  }

  getHtml() {
    if (!this._responseInformation || !this._responseInformation.rawResponse) {
      return null;
    }
    const responseTokens = this._responseInformation.rawResponse.split('\n');
    if (responseTokens.length < 2) {
      return null;
    }

    return responseTokens[1];
  }

  renderIframe() {
    const adCode = this.getHtml();
    if (!adCode) {
      return;
    }
    const containerElement = document.getElementById(this.getSlotElementId());

    if (!containerElement) {
      return;
    }

    const iframe = document.createElement('iframe');
    containerElement.appendChild(iframe);
    iframe.id = this.getAdUnitPath();

    iframe.contentDocument.open();
    let ad = adCode.replace(/\\\\n/g, 'slashn');
    ad = ad.replace(/\\n/g, '');
    ad = ad.replace('slashn', '\\n');
    iframe.contentDocument.write(ad);
    iframe.contentDocument.close();
  }
}

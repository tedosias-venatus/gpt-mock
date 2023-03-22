window["googletag"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _GPT = __webpack_require__(1);

	var _GPT2 = _interopRequireDefault(_GPT);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/** @external {DFP} https://www.google.com/dfp */

	/**
	 * @external {Array#push} https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
	 */

	module.exports = _GPT2['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _CompanionAdsService = __webpack_require__(2);

	var _CompanionAdsService2 = _interopRequireDefault(_CompanionAdsService);

	var _ContentService = __webpack_require__(4);

	var _ContentService2 = _interopRequireDefault(_ContentService);

	var _PubAdsService = __webpack_require__(5);

	var _PubAdsService2 = _interopRequireDefault(_PubAdsService);

	var _Slot = __webpack_require__(6);

	var _Slot2 = _interopRequireDefault(_Slot);

	var _SizeMappingBuilder = __webpack_require__(22);

	var _SizeMappingBuilder2 = _interopRequireDefault(_SizeMappingBuilder);

	var _CommandArray = __webpack_require__(23);

	var _CommandArray2 = _interopRequireDefault(_CommandArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	var GPT = function () {
	  /**
	   * Creates a new GPT instance.
	   *
	   * @param {number} version The version to emulate.
	   */
	  function GPT() {
	    var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 94;

	    _classCallCheck(this, GPT);

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
	    this._addService(new _CompanionAdsService2['default'](this));
	    this._addService(new _ContentService2['default'](this));
	    this._addService(new _PubAdsService2['default'](this));
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


	  GPT.prototype.getVersion = function getVersion() {
	    return '' + this._version;
	  };

	  /**
	   * Returns a reference to the {@link CompanionAdsService}.
	   *
	   * @returns {CompanionAdsService} Instance of the {@link CompanionAdsService}.
	   */


	  GPT.prototype.companionAds = function companionAds() {
	    return this._services[_CompanionAdsService2['default']._name];
	  };

	  /**
	   * Returns a reference to the {@link ContentService}.
	   *
	   * @returns {ContentService} Instance of the {@link ContentService}.
	   */


	  GPT.prototype.content = function content() {
	    return this._services[_ContentService2['default']._name];
	  };

	  /**
	   * Returns a reference to the {@link PubAdsService}.
	   *
	   * @returns {PubAdsService} Instance of the {@link PubAdsService}.
	   */


	  GPT.prototype.pubads = function pubads() {
	    return this._services[_PubAdsService2['default']._name];
	  };

	  /**
	   * Enables all {@link GPT} services that have been defined for ad slots on the page.
	   */


	  GPT.prototype.enableServices = function enableServices() {
	    for (var service in this._services) {
	      if (this._services.hasOwnProperty(service)) {
	        this._services[service].enable();
	      }
	    }
	  };

	  /**
	   * Creates a new {@link SizeMappingBuilder}.
	   *
	   * @returns {SizeMappingBuilder} A new builder.
	   */


	  GPT.prototype.sizeMapping = function sizeMapping() {
	    return new _SizeMappingBuilder2['default']();
	  };

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


	  GPT.prototype.defineSlot = function defineSlot(adUnitPath, size, optDiv) {
	    this._slotCounter += 1;
	    return this._addSlot(new _Slot2['default'](adUnitPath, size, optDiv, this._slotCounter));
	  };

	  /**
	   * Constructs an out-of-page (interstitial) ad slot with the given ad unit path.
	   * optDiv is the ID of the div element that will contain the ad.
	   *
	   * @param {string} adUnitPath Full path of the ad unit with the network code and ad unit code.
	   * @param {string} [optDiv] ID of the div that will contain this ad unit.
	   * @returns {Slot} The newly created slot.
	   */


	  GPT.prototype.defineOutOfPageSlot = function defineOutOfPageSlot(adUnitPath, optDiv) {
	    this._slotCounter += 1;
	    var slot = new _Slot2['default'](adUnitPath, [], optDiv, this._slotCounter);
	    slot._outOfPage = true;
	    return this._addSlot(slot);
	  };

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


	  GPT.prototype.destroySlots = function destroySlots(optSlots) {
	    for (var _iterator = optSlots || this._slots, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var slot = _ref;

	      var i = this._slots.indexOf(slot);
	      if (i !== -1) {
	        slot._removeServices();
	        this._removeSlot(slot);
	      } else {
	        return false;
	      }
	    }

	    return true;
	  };

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


	  GPT.prototype.display = function display(div) {
	    if (div) {
	      for (var _iterator2 = this._slots, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	        var _ref2;

	        if (_isArray2) {
	          if (_i2 >= _iterator2.length) break;
	          _ref2 = _iterator2[_i2++];
	        } else {
	          _i2 = _iterator2.next();
	          if (_i2.done) break;
	          _ref2 = _i2.value;
	        }

	        var slot = _ref2;

	        if (slot.getSlotElementId() === div) {
	          slot.display();
	          return;
	        }
	      }
	    }
	  };

	  /**
	   * Opens the Console.
	   */


	  GPT.prototype.openConsole = function openConsole() {};

	  /**
	   * Disables the Console.
	   */


	  GPT.prototype.disablePublisherConsole = function disablePublisherConsole() {};

	  /**
	   * Sets that title for all ad container iframes created by {@link PubAdsService},
	   * from this point onwards.
	   *
	   * @param {string} title The title to set.
	   */


	  GPT.prototype.setAdIframeTitle = function setAdIframeTitle(title) {
	    this._title = title;
	  };

	  /**
	   * Adds the given {@link Service}.
	   *
	   * @private
	   * @param {Service} service The service to add
	   * @returns {Service} The service added
	   */


	  GPT.prototype._addService = function _addService(service) {
	    this._services[service.getName()] = service;
	    return service;
	  };

	  /**
	   * Adds the given {@link Slot}.
	   *
	   * @private
	   * @param {Slot} slot The {@link Slot} to add.
	   * @returns {Slot} The {@link Slot} added.
	   */


	  GPT.prototype._addSlot = function _addSlot(slot) {
	    if (this._slots.indexOf(slot) === -1) {
	      this._slots.push(slot);
	    }
	    return slot;
	  };

	  /**
	   * Removes the given {@link Slot}.
	   *
	   * @private
	   * @param {Slot} slot The {@link Slot} to remove.
	   */


	  GPT.prototype._removeSlot = function _removeSlot(slot) {
	    var index = this._slots.indexOf(slot);
	    if (index !== -1) {
	      this._slots.splice(index, 1);
	    }
	  };

	  /**
	   * Tells the {@link GPT} service that it has finished loading.  This method
	   * MUST be called in order for most of the rest of the library to function.
	   *
	   * @public
	   */


	  GPT.prototype._loaded = function _loaded() {
	    if (!this.apiReady) {
	      this.apiReady = true;
	      this.cmd = new _CommandArray2['default'](this.cmd);
	    }
	  };

	  return GPT;
	}();

	exports['default'] = GPT;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Service2 = __webpack_require__(3);

	var _Service3 = _interopRequireDefault(_Service2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Companion Ads service. This service is used by video ads to show companion ads.
	 */
	var CompanionAdsService = function (_Service) {
	  _inherits(CompanionAdsService, _Service);

	  /**
	   * Creates a new CompanionAdsService.
	   *
	   * @param {GPT} gpt The containing {@link GPT} instance.
	   */
	  function CompanionAdsService(gpt) {
	    _classCallCheck(this, CompanionAdsService);

	    var _this = _possibleConstructorReturn(this, _Service.call(this, gpt, CompanionAdsService._name));

	    _this._options = {
	      syncLoading: false,
	      refreshUnfilledSlots: null
	    };
	    return _this;
	  }

	  /**
	   * The name of the service.
	   *
	   * @type {string}
	   * @private
	   */


	  /**
	   * Enables the service implementation to be loaded synchronously. This needs
	   * to be called before {@link GPT#enableServices}.
	   *
	   * Note: this call can be only used if gpt.js is also loaded synchronously,
	   * for example, by using a script element. If called when {@link GPT} is loaded
	   * asynchronously, the outcome of the loading is undefined.
	   */
	  CompanionAdsService.prototype.enableSyncLoading = function enableSyncLoading() {
	    this._options.syncLoading = true;
	  };

	  /**
	   * Sets whether companion slots that have not been filled will be automatically
	   * backfilled. Only slots that are also registered with the {@link PubAdsService} will
	   * be backfilled. This method can be called multiple times during the page's
	   * lifetime to turn backfill on and off.
	   *
	   * @param {boolean} value true to automatically backfill unfilled slots,
	   * false to leave them unchanged.
	   */


	  CompanionAdsService.prototype.setRefreshUnfilledSlots = function setRefreshUnfilledSlots(value) {
	    this._options.refreshUnfilledSlots = value;
	  };

	  /* Undocumented
	    refreshAllSlots()
	    fillSlot(a, b, c, d)
	    notifyUnfilledSlots(a)
	    setClearUnfilledSlots(a)
	    getDisplayAdsCorrelator()
	    getVideoStreamCorrelator()
	    isRoadblockingSupported()
	    isSlotAPersistentRoadblock()
	  */


	  _createClass(CompanionAdsService, null, [{
	    key: '_name',
	    get: function get() {
	      return 'companion_ads';
	    }
	  }]);

	  return CompanionAdsService;
	}(_Service3['default']);

	exports['default'] = CompanionAdsService;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Base service class that contains methods common for all services.
	 */
	var Service = function () {
	  /**
	   * Creates a new {@link Service}.
	   *
	   * @param {GPT} gpt The containing {@link GPT} instance.
	   * @param {string} name The name of the service
	   */
	  function Service(gpt, name) {
	    _classCallCheck(this, Service);

	    this._name = name;
	    this._gpt = gpt;
	    this._enabled = false;
	    this._used = false;
	    this._listeners = {};
	    this._attributes = {};
	    this._slots = [];
	    this._slotCounter = 0;
	    this._slotIdMap = {};
	  }

	  /**
	   * Returns the name of the service.
	   *
	   * @experimental
	   * @returns {string} The name of the service
	   */


	  Service.prototype.getName = function getName() {
	    return this._name;
	  };

	  /**
	   * Returns a version string.
	   *
	   * @experimental
	   * @returns {string} The version string.
	   */


	  Service.prototype.getVersion = function getVersion() {
	    return 'unversioned';
	  };

	  /**
	   * Returns the slots with this service enabled.
	   *
	   * @experimental
	   * @returns {Array<Slot>} The slots
	   */


	  Service.prototype.getSlots = function getSlots() {
	    return this._slots.slice(0);
	  };

	  /**
	   * Adds the given slot to this service.
	   *
	   * @param {Slot} slot The slot to add
	   * @returns {Slot}
	   * @private
	   */


	  Service.prototype._addSlot = function _addSlot(slot) {
	    if (this._slots.indexOf(slot) === -1) {
	      this._gpt._addSlot(slot);

	      this._slots.push(slot);
	      this._slotCounter = this._slotCounter + 1;

	      var id = slot.getAdUnitPath() + '_' + this._slotCounter;
	      this._slotIdMap[id] = slot;
	    }

	    this._used = true;
	    return slot;
	  };

	  /**
	   * Removes the given slot from the service.
	   *
	   * @param {Slot} slot The slot to remove
	   * @private
	   */


	  Service.prototype._removeSlot = function _removeSlot(slot) {
	    var index = this._slots.indexOf(slot);
	    if (index !== -1) {
	      this._slots.splice(index, 1);
	      this._gpt._removeSlot(slot);
	      var id = slot.getAdUnitPath() + '_' + (index + 1);
	      delete this._slotIdMap[id];
	    }
	  };

	  /**
	   * Returns a map of IDs to slots.
	   *
	   * @experimental
	   * @returns {Object} The map of IDs to slots.
	   */


	  Service.prototype.getSlotIdMap = function getSlotIdMap() {
	    return _extends({}, this._slotIdMap);
	  };

	  /**
	   * Registers a listener that allows you to set up and call a JavaScript
	   * function when a specific {@link GPT} event happens on the page. The following
	   * events are supported:
	   * * googletag.events.ImpressionViewableEvent
	   * * googletag.events.SlotOnloadEvent
	   * * googletag.events.SlotRenderEndedEvent
	   * * googletag.events.SlotVisibilityChangedEvent
	   *
	   * An object of the appropriate event type is passed to the listener when it is called.
	   *
	   * @param {string} eventType A string representing the type of event generated
	   * by GPT. Event types are case sensitive.
	   * @param {function(event: Object)} listener Function that takes a single event object argument.
	   * @returns {Service} The service object on which the method was called.
	   */


	  Service.prototype.addEventListener = function addEventListener(eventType, listener) {
	    this._listeners[eventType] = this._listeners[eventType] || [];
	    this._listeners[eventType].push(listener);
	    return this;
	  };

	  /**
	   * Fires the specified eventType, calling all registered listeners with the
	   * specified event object.
	   *
	   * @param {string} eventType The event type to fire.
	   * @param {Object} event The event object to pass to listeners.
	   * @private
	   */


	  Service.prototype._fireEvent = function _fireEvent(eventType, event) {
	    for (var _iterator = this._listeners[eventType] || [], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var listener = _ref;

	      listener(event);
	    }
	  };

	  /**
	   * Returns the value for the AdSense attribute associated with the given key.
	   *
	   * @param {string} key Name of the attribute to look for.
	   * @returns {?string} Current value for the attribute key, or null if the key
	   * is not present
	   */


	  Service.prototype.get = function get(key) {
	    return this._attributes[key] || null;
	  };

	  /**
	   * Returns the attribute keys that have been set on this service.
	   *
	   * @returns {!Array<string>} Array of attribute keys set on this service.
	   * Ordering is undefined.
	   */


	  Service.prototype.getAttributeKeys = function getAttributeKeys() {
	    return Object.keys(this._attributes);
	  };

	  /**
	   * Sets values for AdSense attributes that apply to all ad slots under the
	   * publisher ads service. See AdSense Attributes for a list of available keys
	   * and values. Calling this more than once for the same key will override
	   * previously set values for that key. All values must be set before the
	   * first display call.
	   *
	   * @param {string} key The name of the attribute.
	   * @param {string} value Attribute value.
	   * @returns {Service} The service object on which the method was called.
	   */


	  Service.prototype.set = function set(key, value) {
	    this._attributes[key] = value;
	    return this;
	  };

	  /**
	   * Constructs and displays an ad slot with the given ad unit path and size.
	   * This method does not work with single request mode.
	   *
	   * @param {string} adUnitPath Ad unit path of slot to be rendered.
	   * @param {GeneralSize} size Width and height of the slot.
	   * @param {string} [optDiv] ID of the div containing the slot.
	   * @param {string} [optClickUrl] The click URL to use on this slot.
	   */


	  Service.prototype.display = function display(adUnitPath, size, optDiv, optClickUrl) {
	    this._used = true;
	    this.enable();
	    this._gpt.defineSlot(adUnitPath, size, optDiv).addService(this).setClickUrl(optClickUrl);
	  };

	  /**
	   * Enables the service.
	   *
	   * @experimental
	   */


	  Service.prototype.enable = function enable() {
	    this._enabled = true;
	  };

	  return Service;
	}();

	exports['default'] = Service;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Service2 = __webpack_require__(3);

	var _Service3 = _interopRequireDefault(_Service2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * The content service. This service is used to set the content of a slot manually.
	 */
	var ContentService = function (_Service) {
	  _inherits(ContentService, _Service);

	  /**
	   * Creates a new {@link ContentService}.
	   *
	   * @param {GPT} gpt The containing {@link GPT} instance.
	   */
	  function ContentService(gpt) {
	    _classCallCheck(this, ContentService);

	    var _this = _possibleConstructorReturn(this, _Service.call(this, gpt, ContentService._name));

	    _this._storedContent = [];
	    return _this;
	  }

	  /**
	   * The name of the service.
	   *
	   * @type {string}
	   * @private
	   */


	  /**
	   * Enables the service.
	   *
	   * @override
	   */
	  ContentService.prototype.enable = function enable() {
	    _Service.prototype.enable.call(this);
	    for (var _iterator = this._storedContent, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var _ref2 = _ref,
	          slot = _ref2[0],
	          content = _ref2[1];

	      slot._setContent(content);
	    }
	    this._storedContent = [];
	  };

	  /**
	   * Fills a slot with the given content. If services are not yet enabled,
	   * stores the content and fills it in when services are enabled.
	   *
	   * @param {Slot} slot The slot to be filled.
	   * @param {string} content The HTML content for the slot.
	   */


	  ContentService.prototype.setContent = function setContent(slot, content) {
	    if (this._enabled) {
	      slot._setContent(content);
	    } else {
	      this._storedContent.push([slot, content]);
	    }
	  };

	  _createClass(ContentService, null, [{
	    key: '_name',
	    get: function get() {
	      return 'content';
	    }
	  }]);

	  return ContentService;
	}(_Service3['default']);

	exports['default'] = ContentService;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Service2 = __webpack_require__(3);

	var _Service3 = _interopRequireDefault(_Service2);

	var _Slot = __webpack_require__(6);

	var _Slot2 = _interopRequireDefault(_Slot);

	var _TargetingMap = __webpack_require__(21);

	var _TargetingMap2 = _interopRequireDefault(_TargetingMap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Publisher Ads service. This service is used to fetch and show ads from your
	 * {@link DFP} account.
	 */
	var PubAdsService = function (_Service) {
	  _inherits(PubAdsService, _Service);

	  /**
	   * Creates a new PubAdsService.
	   *
	   * @param {GPT} gt The containing {@link GPT} instance.
	   */
	  function PubAdsService(gt) {
	    _classCallCheck(this, PubAdsService);

	    var _this = _possibleConstructorReturn(this, _Service.call(this, gt, PubAdsService._name));

	    _this._categoryExclusions = [];
	    _this._targeting = new _TargetingMap2["default"]();
	    _this._options = {
	      collapseEmptyDivs: false,
	      collapseBeforeAdFetch: false,
	      initialLoad: true,
	      asyncRendering: false,
	      singleRequest: false,
	      syncRendering: false,
	      videoAds: false,
	      centerAds: false,
	      forceSafeFrame: false,
	      cookieOptions: null,
	      ppid: null,
	      videoContentId: null,
	      videoCmsId: null,
	      safeFrameConfig: null,
	      tagForChildDirectedTreatment: null
	    };
	    _this._correlator = Math.random();
	    _this._isInitialLoadDisabled = window.googletag.pubadsMock.isInitialLoadDisabled || false;
	    return _this;
	  }

	  /**
	   * The name of the service.
	   *
	   * @private
	   * @type {string}
	   */


	  PubAdsService.prototype.isInitialLoadDisabled = function isInitialLoadDisabled() {
	    return this._isInitialLoadDisabled;
	  };

	  /**
	   * Enables the service.
	   *
	   * @override
	   */


	  PubAdsService.prototype.enable = function enable() {
	    _Service.prototype.enable.call(this);
	    this._gpt.pubadsReady = true;
	  };

	  /**
	   * Fetches and displays new ads for specific or all slots on the page.
	   * Works only in asynchronous rendering mode.
	   *
	   * For proper behavior across all browsers, calling refresh must be preceded
	   * by a call to display the ad slot. If the call to display is omitted, refresh
	   * may behave unexpectedly. If desired, the {@link PubAdsService#disableInitialLoad} method can be
	   * used to stop display from fetching an ad.
	   *
	   * @param {Array<!Slot>} [optSlots] The slots to refresh. Array is optional;
	   * all slots will be refreshed if it is unspecified.
	   * @param {{changeCorrelator: boolean}} [optOptions] Configuration options
	   * associated with this refresh call. changeCorrelator specifies whether or
	   * not a new correlator is to be generated for fetching ads. Our ad servers
	   * maintain this correlator value briefly (currently for 30 seconds, but
	   * subject to change), such that requests with the same correlator received
	   * close together will be considered a single page view. By default a new
	   * correlator is generated for every refresh.
	   */


	  PubAdsService.prototype.refresh = function refresh(optSlots, optOptions) {
	    var slots = this._slots;
	    if (optSlots != null) {
	      slots = optSlots;
	    }
	    for (var _iterator = slots, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var slot = _ref;

	      slot._refresh();
	    }
	    if (optOptions && optOptions.changeCorrelator) {
	      this._correlator = Math.random();
	    }
	  };

	  /**
	   * Removes the ads from the given slots and replaces them with blank
	   * content. The slots will be marked as unfetched.
	   *
	   * @param {Array<!Slot>} [optSlots] The array of slots to clear. Array is
	   * optional; all slots will be cleared if it is unspecified.
	   * @returns {boolean} Returns true if slots have been cleared, false otherwise.
	   */


	  PubAdsService.prototype.clear = function clear(optSlots) {
	    var slots = this._slots;
	    if (optSlots != null) {
	      slots = optSlots;
	    }

	    for (var _iterator2 = slots, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	      var _ref2;

	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref2 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref2 = _i2.value;
	      }

	      var slot = _ref2;

	      if (this._slots.indexOf(slot) !== -1) {
	        slot._clear();
	      } else {
	        return false;
	      }
	    }

	    return true;
	  };

	  /**
	   * Constructs an out-of-page passback slot. A passback is where a {@link GPT} snippet
	   * is used as a creative in an ad serving system. The ad serving system could
	   * be {@link DFP} or a third party. In this case, the ads are always requested
	   * synchronously in non-single request mode.
	   *
	   * @param {string} adUnitPath The ad unit path of the slot to use as a passback.
	   * @returns {?Slot} The new passback object or null if the method was
	   * called with invalid arguments.
	   */


	  PubAdsService.prototype.defineOutOfPagePassback = function defineOutOfPagePassback(adUnitPath) {
	    if (adUnitPath != null) {
	      var slot = new _Slot2["default"](adUnitPath).addService(this);
	      slot._passback = true;
	      slot._outOfPage = true;
	      return slot;
	    } else {
	      return null;
	    }
	  };

	  /**
	   * Constructs a passback slot. A passback is where a {@link GPT} snippet is used as a
	   * creative in an ad serving system. The ad serving system could be {@link DFP} or a
	   * third party. In this case, the ads are always requested synchronously in
	   * non-single request mode.
	   *
	   * @param {string} adUnitPath The ad unit path of the slot to use as a passback.
	   * @param {GeneralSize} size The size of the slot.
	   * @returns {?Slot} The new passback object or null if the method was
	   * called with invalid arguments.
	   */


	  PubAdsService.prototype.definePassback = function definePassback(adUnitPath, size) {
	    if (adUnitPath != null && size != null) {
	      var slot = new _Slot2["default"](adUnitPath, size).addService(this);
	      slot._passback = true;
	      return slot;
	    } else {
	      return null;
	    }
	  };

	  /**
	   * Disables requests for ads on page load, but allows ads to be requested with
	   * a {@link PubAdsService#refresh} call. This should be set prior to enabling
	   * the service. Async mode must be used; otherwise it will be impossible to
	   * request ads using {@link PubAdsService#refresh}.
	   */


	  PubAdsService.prototype.disableInitialLoad = function disableInitialLoad() {
	    var _this2 = this;

	    this._unlessEnabled(function () {
	      _this2._options.initialLoad = false;
	    });
	  };

	  /**
	   * Enables async rendering mode to enable non-blocking fetching and rendering
	   * of ads. Because the service uses asynchronous rendering by default, you
	   * only need to use this method to override a previous setting. Async mode
	   * must be set before the service is enabled.
	   *
	   * @returns {boolean} Returns true if async rendering mode was enabled and
	   * false if it is impossible to enable async rendering mode because the method
	   * was called after the service was enabled.
	   */


	  PubAdsService.prototype.enableAsyncRendering = function enableAsyncRendering() {
	    var _this3 = this;

	    return this._unlessEnabled(function () {
	      _this3._options.asyncRendering = true;
	    });
	  };

	  /**
	   * Enables single request mode for fetching multiple ads at the same time.
	   * This requires all pubads slots to be defined and added to the {@link PubAdsService}
	   * prior to enabling the service. Single request mode must be set
	   * before the service is enabled.
	   *
	   * @returns {boolean} Returns true if single request mode was enabled and false
	   * if it is impossible to enable single request mode because the method was
	   * called after the service was enabled.
	   */


	  PubAdsService.prototype.enableSingleRequest = function enableSingleRequest() {
	    var _this4 = this;

	    return this._unlessEnabled(function () {
	      _this4._options.singleRequest = true;
	    });
	  };

	  /**
	   * Enables sync rendering mode to enable blocking fetching and rendering of ads.
	   * This mode must be set before the service is enabled. Synchronous rendering
	   * also requires that the {@link GPT} JavaScript be loaded synchronously.
	   *
	   * @returns {boolean} Returns true if sync rendering mode was enabled and false
	   * if it is impossible to enable sync rendering mode because the method was
	   * called after the service was enabled.
	   */


	  PubAdsService.prototype.enableSyncRendering = function enableSyncRendering() {
	    var _this5 = this;

	    return this._unlessEnabled(function () {
	      _this5._options.syncRendering = true;
	    });
	  };

	  /**
	   * Signals to {@link GPT} that video ads will be present on the page. This enables
	   * competitive exclusion constraints on display and video ads. If the video
	   * content is known, call setVideoContent in order to be able to use content
	   * exclusion for display ads.
	   */


	  PubAdsService.prototype.enableVideoAds = function enableVideoAds() {
	    this._options.videoAds = true;
	  };

	  /**
	   * Sets custom targeting parameters for a given key that apply to all pubads
	   * service ad slots. Calling this multiple times for the same key will
	   * overwrite old values. These keys are defined in your {@link DFP} account.
	   *
	   * @param {string} key Targeting parameter key.
	   * @param {string|!Array<string>} value Targeting parameter value or array of values.
	   * @returns {PubAdsService} The service object on which the method was called.
	   */


	  PubAdsService.prototype.setTargeting = function setTargeting(key, value) {
	    this._targeting.set(key, value);
	    return this;
	  };

	  /**
	   * Returns a specific custom service-level targeting parameter that has been set.
	   *
	   * @param {string} key The targeting key to look for.
	   * @returns {!Array<string>} The values associated with this key, or an empty
	   * array if there is no such key.
	   */


	  PubAdsService.prototype.getTargeting = function getTargeting(key) {
	    return this._targeting.get(key);
	  };

	  /**
	   * Returns the list of all custom service-level targeting keys that have been set.
	   *
	   * @returns {!Array<string>} Array of targeting keys. Ordering is undefined.
	   */


	  PubAdsService.prototype.getTargetingKeys = function getTargetingKeys() {
	    return this._targeting.keys();
	  };

	  /**
	   * Clears custom targeting parameters for a given key.
	   *
	   * @param {string} key Targeting parameter key.
	   * @returns {PubAdsService} The service object on which the method was called.
	   */


	  PubAdsService.prototype.clearTargeting = function clearTargeting(key) {
	    this._targeting.clear(key);
	    return this;
	  };

	  /**
	   * Enables collapsing of slot divs so that they don't take up any space on the
	   * page when there is no ad content to display. This mode must be set before
	   * the service is enabled.
	   *
	   * @param {boolean} [optCollapseBeforeAdFetch=false] Whether to collapse the slots
	   * even before the ads are fetched. This parameter is optional; if not
	   * provided, false will be used as the default value.
	   * @returns {boolean} Returns true if div collapse mode was enabled and false
	   * if it is impossible to enable collapse mode because the method was called
	   * after the service was enabled.
	   */


	  PubAdsService.prototype.collapseEmptyDivs = function collapseEmptyDivs() {
	    var _this6 = this;

	    var optCollapseBeforeAdFetch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    return this._unlessEnabled(function () {
	      _this6._options.collapseEmptyDivs = true;
	      _this6._options.collapseBeforeAdFetch = optCollapseBeforeAdFetch;
	    });
	  };

	  /**
	   * Sets a page-level ad category exclusion for the given label name.
	   *
	   * @param {string} categoryExclusion The ad category exclusion label to add.
	   * @returns {PubAdsService} The service object on which the method was called.
	   */


	  PubAdsService.prototype.setCategoryExclusion = function setCategoryExclusion(categoryExclusion) {
	    this._categoryExclusions.push(categoryExclusion);
	    return this;
	  };

	  /**
	   * Clears all page-level ad category exclusion labels.
	   * This is useful if you want to refresh the slot.
	   *
	   * @returns {PubAdsService} The service object on which the method was called.
	   */


	  PubAdsService.prototype.clearCategoryExclusions = function clearCategoryExclusions() {
	    this._categoryExclusions = [];
	    return this;
	  };

	  /**
	   * Enables/disables centering of ads. This mode must be set before the service
	   * is enabled. Centering is disabled by default.
	   *
	   * @param {boolean} centerAds true to center ads, false to left-align them.
	   */


	  PubAdsService.prototype.setCentering = function setCentering(centerAds) {
	    var _this7 = this;

	    this._unlessEnabled(function () {
	      _this7._options.centerAds = centerAds;
	    });
	  };

	  /**
	   * Sets cookie options for GPT on the page.
	   *
	   * @param {number} options The cookie options to set. Set the options parameter
	   * to the integer value 1 to ignore cookies, and to 0 to use cookies.
	   * @returns {PubAdsService} The service object on which the method was called.
	   */


	  PubAdsService.prototype.setCookieOptions = function setCookieOptions(options) {
	    this._options.cookieOptions = options;
	    return this;
	  };

	  /**
	   * Configures whether all ads on the page should be forced to be rendered using
	   * a SafeFrame container.
	   *
	   * @param {boolean} forceSafeFrame true to force all ads on the page to be
	   * rendered in SafeFrames and false to change the previous setting to false.
	   * Setting this to false when unspecified earlier, won't change anything.
	   * @returns {PubAdsService} The service object on which the function was called.
	   */


	  PubAdsService.prototype.setForceSafeFrame = function setForceSafeFrame(forceSafeFrame) {
	    this._options.forceSafeFrame = forceSafeFrame;
	    return this;
	  };

	  /**
	   * Passes location information from websites so you can geo-target line items
	   * to specific locations. {@link DFP} will not use location data unless this feature
	   * has been enabled for your network.
	   *
	   * @param {string|number} latitudeOrAddress Latitude or freeform address.
	   * @param {number} [optLongitude] The longitude (if a latitude was provided as first argument).
	   * @param {number} [optRadius] The radius in millimeters. Will be rounded to closest integer.
	   * Only used when passing the latitude and longitude.
	   * @returns {PubAdsService} The service object on which the method was called.
	   */


	  PubAdsService.prototype.setLocation = function setLocation(latitudeOrAddress, optLongitude, optRadius) {
	    if (typeof latitudeOrAddress === "number") {
	      this._options.latitude = latitudeOrAddress || null;
	      this._options.longitude = optLongitude || null;
	      this._options.radius = optRadius || null;
	      this._options.address = null;
	    } else {
	      this._options.address = latitudeOrAddress;
	      this._options.latitude = null;
	      this._options.longitude = null;
	      this._options.radius = null;
	    }
	    return this;
	  };

	  /**
	   * Sets the value for the publisher-provided ID.
	   *
	   * @param {string} ppid An alphanumeric ID provided by the publisher with a
	   * recommended maximum of 150 characters.
	   * @returns {PubAdsService} The service object on which the method was called.
	   */


	  PubAdsService.prototype.setPublisherProvidedId = function setPublisherProvidedId(ppid) {
	    this._options.ppid = ppid;
	    return this;
	  };

	  /**
	   * Sets the page-level preferences for SafeFrame configuration. Any
	   * unrecognized keys in the config object will be ignored. The entire config
	   * will be ignored if an invalid value is passed for a recognized key. These
	   * page level preferences will be overriden by slot level preferences, if
	   * specified.
	   *
	   * @param {SafeFrameConfig} config The configuration object.
	   * @returns {PubAdsService} The service object on which the method was called.
	   */


	  PubAdsService.prototype.setSafeFrameConfig = function setSafeFrameConfig(config) {
	    this._options.safeFrameConfig = config;
	    return this;
	  };

	  /**
	   * Configures whether the page should be treated as child-directed.
	   *
	   * @param {number} value The child-directed treatment tag status to set. Set
	   * the options parameter to the integer value 1 to mark the ad request as
	   * child-directed, and to 0 for ad requests that are not child-directed.
	   * @returns {PubAdsService} The service object on which the method was called.
	   */


	  PubAdsService.prototype.setTagForChildDirectedTreatment = function setTagForChildDirectedTreatment(value) {
	    this._options.tagForChildDirectedTreatment = value;
	    return this;
	  };

	  /**
	   * Clears the configuration for whether the page should be treated as child-directed.
	   *
	   * @returns {PubAdsService} The service object on which the method was called.
	   */


	  PubAdsService.prototype.clearTagForChildDirectedTreatment = function clearTagForChildDirectedTreatment() {
	    this._options.tagForChildDirectedTreatment = null;
	    return this;
	  };

	  /**
	   * Sets the video content information to be sent along with the ad requests for
	   * targeting and content exclusion purposes. Video ads will be automatically
	   * enabled when this method is called. For videoContentId and videoCmsId, use
	   * the values that are provided to the {@link DFP} content ingestion service.
	   *
	   * @param {string} videoContentId The video content ID.
	   * @param {string} videoCmsId The video CMS ID.
	   */


	  PubAdsService.prototype.setVideoContent = function setVideoContent(videoContentId, videoCmsId) {
	    this._options.videoContentId = videoContentId;
	    this._options.videoCmsId = videoCmsId;
	  };

	  /**
	   * Changes the correlator that is sent with ad requests, effectively starting
	   * a new page view. The correlator is the same for all the ad requests coming
	   * from one page view, and unique across page views. Only applies to async mode.
	   *
	   * @returns {PubAdsService} The service object on which the function was called.
	   */


	  PubAdsService.prototype.updateCorrelator = function updateCorrelator() {
	    return this;
	  };

	  /**
	   * Conditionally execute a function unless the service has already been
	   * enabled.
	   *
	   * @param {function} fn The function to call if the service is not enabled
	   * @returns {boolean} true if the function was called; false if the service has
	   * already been enabled.
	   */


	  PubAdsService.prototype._unlessEnabled = function _unlessEnabled(fn) {
	    if (this._enabled) {
	      return false;
	    } else {
	      fn();
	      return true;
	    }
	  };

	  PubAdsService.prototype.setPrivacySettings = function setPrivacySettings(privacySettings) {
	    this.privacySettings = privacySettings;
	  };

	  PubAdsService.prototype.setRequestNonPersonalizedAds = function setRequestNonPersonalizedAds(enabled) {
	    this.RequestNonPersonalizedAdsEnabled = enabled;
	  };

	  PubAdsService.prototype.removeEventListener = function removeEventListener(eventType, fn) {
	    this._listeners[eventType] = (this._listeners[eventType] || []).filter(function (listener) {
	      return listener !== fn;
	    });
	  };

	  _createClass(PubAdsService, null, [{
	    key: "_name",
	    get: function get() {
	      return "publisher_ads";
	    }
	  }]);

	  return PubAdsService;
	}(_Service3["default"]);

	exports["default"] = PubAdsService;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _GeneralSize = __webpack_require__(7);

	var GeneralSize = _interopRequireWildcard(_GeneralSize);

	var _SizeMappingArray = __webpack_require__(13);

	var SizeMappingArray = _interopRequireWildcard(_SizeMappingArray);

	var _ImpressionViewableEvent = __webpack_require__(15);

	var _ImpressionViewableEvent2 = _interopRequireDefault(_ImpressionViewableEvent);

	var _SlotOnloadEvent = __webpack_require__(16);

	var _SlotOnloadEvent2 = _interopRequireDefault(_SlotOnloadEvent);

	var _SlotRenderEndedEvent = __webpack_require__(17);

	var _SlotRenderEndedEvent2 = _interopRequireDefault(_SlotRenderEndedEvent);

	var _SlotVisibilityChangedEvent = __webpack_require__(18);

	var _SlotVisibilityChangedEvent2 = _interopRequireDefault(_SlotVisibilityChangedEvent);

	var _SlotResponseReceivedEvent = __webpack_require__(19);

	var _SlotResponseReceivedEvent2 = _interopRequireDefault(_SlotResponseReceivedEvent);

	var _SlotId = __webpack_require__(20);

	var _SlotId2 = _interopRequireDefault(_SlotId);

	var _TargetingMap = __webpack_require__(21);

	var _TargetingMap2 = _interopRequireDefault(_TargetingMap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Slot is an object representing single ad slot on a page.
	 */
	var Slot = function () {
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
	  function Slot(adUnitPath, size, optDiv) {
	    var instance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	    _classCallCheck(this, Slot);

	    this._id = new _SlotId2['default'](adUnitPath, instance, optDiv);
	    var mock = window.googletag.slotMock[adUnitPath] || null;
	    var mockSize = mock && mock.size;
	    this._sizes = GeneralSize.toSizes(mockSize || size);
	    this._services = [];
	    this._categoryExclusions = [];
	    this._targeting = new _TargetingMap2['default']();
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


	  Slot.prototype.getName = function getName() {
	    return this._id.getName();
	  };

	  /**
	   * Returns the instance of the {@link Slot}.
	   *
	   * @experimental
	   * @returns {number} The instance
	   */


	  Slot.prototype.getDefinedId = function getDefinedId() {
	    return this._id.getInstance();
	  };

	  /**
	   * Returns the full path of the ad unit, with the network code and ad unit path.
	   *
	   * @returns {string} Ad unit path.
	   */


	  Slot.prototype.getAdUnitPath = function getAdUnitPath() {
	    return this._id.getAdUnitPath();
	  };

	  /**
	   * Returns the id of the slot element provided when the {@link Slot} was defined.
	   *
	   * @returns {string} Slot element id.
	   */


	  Slot.prototype.getSlotElementId = function getSlotElementId() {
	    return this._id.getDomId();
	  };

	  /**
	   * Returns the enabled services.
	   *
	   * @experimental
	   * @returns {Array<Service>} The list of enabled services.
	   */


	  Slot.prototype.getServices = function getServices() {
	    return this._services.slice(0);
	  };

	  /**
	   * Returns the sizes.
	   *
	   * @experimental
	   * @returns {Array<GeneralSize>} The list of sizes.
	   */


	  Slot.prototype.getSizes = function getSizes() {
	    return this._sizes.slice(0);
	  };

	  /**
	   * Returns a flag indicating whether the {@link Slot} is out of the page.
	   *
	   * @experimental
	   * @returns {boolean}
	   */


	  Slot.prototype.getOutOfPage = function getOutOfPage() {
	    return this._options.outOfPage;
	  };

	  /**
	   * Initiates rendering of this slot.
	   */


	  Slot.prototype.display = function display() {
	    if (!this._options.displayed) {
	      this.fetchStarted();
	      this.fetchEnded();
	      this.loaded();
	      this.responseReceived();
	      this.renderStarted();
	      this.renderEnded();

	      this.impressionViewable();
	      this.visibilityChanged(100);
	    }
	  };

	  /**
	   * Returns the list of attribute keys set on this slot. If you intend to see
	   * the keys of service-level attributes inherited by this {@link Slot}, you have to
	   * use the {@link PubAdsService#getAttributeKeys} API.
	   *
	   * @returns {!Array<string>} Array of attribute keys. Ordering is undefined.
	   */


	  Slot.prototype.getAttributeKeys = function getAttributeKeys() {
	    return Object.keys(this._attributes);
	  };

	  /**
	   * Returns the value for the AdSense attribute associated with the given key.
	   * Note that if you intend to see service-level attributes inherited by this
	   * slot, you have to use the {@link PubAdsService#get} API.
	   *
	   * @param {string} key Name of the attribute to look for.
	   * @returns {?string} Current value for the attribute key, or null if the key
	   * is not present.
	   */


	  Slot.prototype.get = function get(key) {
	    return this._attributes[key] || null;
	  };

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


	  Slot.prototype.set = function set(key, value) {
	    this._attributes[key] = value;
	    return this;
	  };

	  /**
	   * Return the attribute map.
	   *
	   * @private
	   * @returns {Object<string, string>} The attribute map
	   */


	  Slot.prototype._getAttributes = function _getAttributes() {
	    return _extends({}, this._attributes);
	  };

	  /**
	   * Returns a specific custom targeting parameter set on this slot.
	   * Service-level targeting parameters are not included.
	   *
	   * @param {string} key The targeting key to look for.
	   * @returns {!Array<string>} The values associated with this key, or an empty
	   * array if there is no such key.
	   */


	  Slot.prototype.getTargeting = function getTargeting(key) {
	    return this._targeting.get(key);
	  };

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


	  Slot.prototype.setTargeting = function setTargeting(key, value) {
	    this._targeting.set(key, value);
	    return this;
	  };

	  /**
	   * Returns the list of all custom targeting keys set on this slot. Service-level
	   * targeting keys are not included.
	   *
	   * @returns {!Array<string>} Array of targeting keys. Ordering is undefined.
	   */


	  Slot.prototype.getTargetingKeys = function getTargetingKeys() {
	    return this._targeting.keys();
	  };

	  /**
	   * Returns the current targeting key-value dictionary.
	   *
	   * @experimental
	   * @returns {Object<string, Array<string>>} the targeting map.
	   */


	  Slot.prototype.getTargetingMap = function getTargetingMap() {
	    return this._targeting.all();
	  };

	  /**
	   * Clears all custom slot-level targeting parameters for this slot.
	   *
	   * @returns {Slot} The {@link Slot} object on which the method was called.
	   */


	  Slot.prototype.clearTargeting = function clearTargeting() {
	    this._targeting.clear();
	    return this;
	  };

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


	  Slot.prototype.updateTargetingFromMap = function updateTargetingFromMap(map) {
	    for (var key in map) {
	      if (map.hasOwnProperty(key)) {
	        this.setTargeting(key, map[key]);
	      }
	    }
	    return this;
	  };

	  /**
	   * Adds a service to this slot.
	   *
	   * @param {Service} service The service to be added.
	   * @returns {Slot} The {@link Slot} object on which the method was called.
	   */


	  Slot.prototype.addService = function addService(service) {
	    if (this._services.indexOf(service) === -1) {
	      this._services.push(service);
	      service._addSlot(this);
	    }
	    return this;
	  };

	  /**
	   * Removes all of the services from the slot.
	   *
	   * @private
	   */


	  Slot.prototype._removeServices = function _removeServices() {
	    for (var _iterator = this._services, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var service = _ref;

	      service._removeSlot(this);
	    }

	    this._services = [];
	  };

	  /**
	   * Returns the ad category exclusion labels for this slot.
	   *
	   * @returns {!Array<string>} The ad category exclusion labels for this slot.
	   */


	  Slot.prototype.getCategoryExclusions = function getCategoryExclusions() {
	    return this._categoryExclusions.slice(0);
	  };

	  /**
	   * Sets a slot-level ad category exclusion label on this slot.
	   *
	   * @param {string} categoryExclusion The ad category exclusion label to add.
	   * @returns {Slot} The {@link Slot} object on which the method was called.
	   */


	  Slot.prototype.setCategoryExclusion = function setCategoryExclusion(categoryExclusion) {
	    this._categoryExclusions.push(categoryExclusion);
	    return this;
	  };

	  /**
	   * Clears all slot-level ad category exclusion labels for this slot.
	   *
	   * @returns {Slot} The {@link Slot} object on which the method was called.
	   */


	  Slot.prototype.clearCategoryExclusions = function clearCategoryExclusions() {
	    this._categoryExclusions = [];
	    return this;
	  };

	  /**
	   * Sets an array of mappings from a minimum viewport size to slot size for this slot.
	   *
	   * @param {!SizeMappingArray} sizeMapping Array of size mappings. You can use
	   * {@link SizeMappingBuilder} to create it. Each size mapping is an array of two elements:
	   * {@link SingleSizeArray} and {@link GeneralSize}.
	   * @returns {Slot} The {@link Slot} object on which the method was called.
	   * @throws {Error} Size mapping has to be an array
	   */


	  Slot.prototype.defineSizeMapping = function defineSizeMapping(sizeMapping) {
	    if (!SizeMappingArray.isSizeMappingArray(sizeMapping)) {
	      throw Error('Size mapping has to be an array');
	    }

	    this._sizeMapping = sizeMapping;

	    return this;
	  };

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


	  Slot.prototype.setClickUrl = function setClickUrl(value) {
	    this._clickUrl = value;
	    return this;
	  };

	  /**
	   * Gets the click URL.
	   *
	   * @experimental
	   * @returns {?string} The click URL
	   */


	  Slot.prototype.getClickUrl = function getClickUrl() {
	    return this._clickUrl;
	  };

	  /**
	   * Returns the ad response information. This is based on the last ad response
	   * for the slot. If this is called when the slot has no ad, null will be
	   * returned.
	   *
	   * @returns {?ResponseInformation}
	   */


	  Slot.prototype.getResponseInformation = function getResponseInformation() {
	    return this._responseInformation;
	  };

	  /**
	   * Sets whether the slot div should be hidden when there is no ad in the slot.
	   * This overrides the service-level settings.
	   *
	   * @param {boolean} collapse Whether to collapse the slot if no ad is returned.
	   * @param {boolean} [optCollapseBeforeAdFetch] Whether to collapse the slot
	   * even before an ad is fetched. Ignored if collapse is not true.
	   * @returns {Slot} The {@link Slot} object on which the method was called.
	   */


	  Slot.prototype.setCollapseEmptyDiv = function setCollapseEmptyDiv(collapse, optCollapseBeforeAdFetch) {
	    this._options.collapseEmptyDiv = collapse;
	    if (collapse) {
	      this._options.collapseBeforeAdFetch = optCollapseBeforeAdFetch;
	    }
	    return this;
	  };

	  /**
	   * Returns whether the slot div should be hiddne when there is no ad in the slot.
	   *
	   * @experimental
	   * @returns {boolean} true to collapse the slot if no ad is returned.
	   */


	  Slot.prototype.getCollapseEmptyDiv = function getCollapseEmptyDiv() {
	    return this._options.collapseEmptyDiv;
	  };

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


	  Slot.prototype.setForceSafeFrame = function setForceSafeFrame(forceSafeFrame) {
	    this._options.forceSafeFrame = forceSafeFrame;
	    return this;
	  };

	  /**
	   * Sets the slot-level preferences for SafeFrame configuration. Any unrecognized
	   * keys in the config object will be ignored. The entire config will be ignored
	   * if an invalid value is passed for a recognized key. These slot level
	   * preferences, if specified, will override any page level preferences.
	   *
	   * @param {SafeFrameConfig} config The configuration object.
	   * @returns {Slot} The {@link Slot} object on which the method was called.
	   */


	  Slot.prototype.setSafeFrameConfig = function setSafeFrameConfig(config) {
	    this._options.safeFrameConfig = config;
	    return this;
	  };

	  /**
	   * Informs the {@link Slot} that its fetch has started.
	   *
	   * @experimental
	   */


	  Slot.prototype.fetchStarted = function fetchStarted() {
	    this._options.fetched = false;
	  };

	  /**
	   * Informs the {@link Slot} that its fetch has finished.
	   *
	   * @experimental
	   */


	  Slot.prototype.fetchEnded = function fetchEnded() {
	    this._options.fetched = true;
	  };

	  /**
	   * Informs the {@link Slot} that it has been loaded.
	   *
	   * @experimental
	   * @emits {SlotOnloadEvent}
	   */


	  Slot.prototype.loaded = function loaded() {
	    for (var _iterator2 = this._services, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	      var _ref2;

	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref2 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref2 = _i2.value;
	      }

	      var service = _ref2;

	      var event = new _SlotOnloadEvent2['default'](service.getName(), this);
	      service._fireEvent(event._name, event);
	    }
	  };

	  /**
	   * Informs the {@link Slot} that response has been received.
	   *
	   * @emits {SlotResponseReceivedEvent}
	   */


	  Slot.prototype.responseReceived = function responseReceived() {
	    for (var _iterator3 = this._services, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	      var _ref3;

	      if (_isArray3) {
	        if (_i3 >= _iterator3.length) break;
	        _ref3 = _iterator3[_i3++];
	      } else {
	        _i3 = _iterator3.next();
	        if (_i3.done) break;
	        _ref3 = _i3.value;
	      }

	      var service = _ref3;

	      var event = new _SlotResponseReceivedEvent2['default'](service.getName(), this);

	      service._fireEvent(event._name, event);
	    }
	  };

	  /**
	   * Informs the {@link Slot} that its rendering has started.
	   *
	   * @experimental
	   */


	  Slot.prototype.renderStarted = function renderStarted() {
	    this._options.displayed = false;
	  };

	  /**
	   * Informs the {@link Slot} that its rendering has finished.
	   *
	   * @experimental
	   * @param {?ResponseInformation} [responseInformation] The response information.
	   * @emits {SlotRenderEndedEvent}
	   */


	  Slot.prototype.renderEnded = function renderEnded(responseInformation) {
	    this._responseInformation = responseInformation || this._responseInformation;
	    this._options.displayed = true;

	    var size = this.getSizes()[0];
	    var singleSize = null;

	    if (size) {
	      singleSize = [size.getWidth(), size.getHeight()];
	    }

	    for (var _iterator4 = this._services, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
	      var _ref4;

	      if (_isArray4) {
	        if (_i4 >= _iterator4.length) break;
	        _ref4 = _iterator4[_i4++];
	      } else {
	        _i4 = _iterator4.next();
	        if (_i4.done) break;
	        _ref4 = _i4.value;
	      }

	      var service = _ref4;

	      var event = void 0;

	      if (this._responseInformation != null) {
	        event = new _SlotRenderEndedEvent2['default'](service.getName(), this, this._responseInformation.creativeId, this._responseInformation.lineItemId, false, singleSize);
	      } else {
	        event = new _SlotRenderEndedEvent2['default'](service.getName(), this, null, null, true, singleSize);
	      }

	      service._fireEvent(event._name, event);
	    }
	  };

	  /**
	   * Notifies the {@link Slot} that it's impression is viewable.
	   *
	   * @emits {ImpressionViewableEvent}
	   */


	  Slot.prototype.impressionViewable = function impressionViewable() {
	    for (var _iterator5 = this._services, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
	      var _ref5;

	      if (_isArray5) {
	        if (_i5 >= _iterator5.length) break;
	        _ref5 = _iterator5[_i5++];
	      } else {
	        _i5 = _iterator5.next();
	        if (_i5.done) break;
	        _ref5 = _i5.value;
	      }

	      var service = _ref5;

	      var event = new _ImpressionViewableEvent2['default'](service.getName(), this);

	      service._fireEvent(event._name, event);
	    }
	  };

	  /**
	   * Notifies the {@link Slot} of its in view percentage.
	   *
	   * @param {number} inViewPercentage The percentage (0-100) of the ad's area that is visible.
	   * @emits {SlotVisibilityChangedEvent}
	   */


	  Slot.prototype.visibilityChanged = function visibilityChanged(inViewPercentage) {
	    if (this._options.inViewPercentage !== inViewPercentage) {
	      this._options.inViewPercentage = inViewPercentage;
	      for (var _iterator6 = this._services, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
	        var _ref6;

	        if (_isArray6) {
	          if (_i6 >= _iterator6.length) break;
	          _ref6 = _iterator6[_i6++];
	        } else {
	          _i6 = _iterator6.next();
	          if (_i6.done) break;
	          _ref6 = _i6.value;
	        }

	        var service = _ref6;

	        var event = new _SlotVisibilityChangedEvent2['default'](service.getName(), this, inViewPercentage);
	        service._fireEvent(event._name, event);
	      }
	    }
	  };

	  /**
	   * Refreshes the {@link Slot}.
	   *
	   * @private
	   */


	  Slot.prototype._refresh = function _refresh() {
	    this._options.refreshed += 1;

	    this.fetchStarted();
	    this.fetchEnded();
	    this.loaded();
	    this.responseReceived();
	    this.renderStarted();
	    this.renderIframe();
	    this.renderEnded();

	    this.impressionViewable();
	    this.visibilityChanged(100);
	  };

	  /**
	   * Clears the {@link Slot}.
	   *
	   * @private
	   */


	  Slot.prototype._clear = function _clear() {
	    this._options.content = null;
	    this._options.fetched = false;
	  };

	  /**
	   * Sets the content of the {@link Slot}.
	   *
	   * @private
	   * @param {?string} content The content to set; or null to clear the content.
	   */


	  Slot.prototype._setContent = function _setContent(content) {
	    this._options.content = content;
	  };

	  /**
	   * Gets the content of the slot {@link Slot}.
	   *
	   * @private
	   * @returns {?string} The content of the slot; or null if the slot has no content.
	   */


	  Slot.prototype._getContent = function _getContent() {
	    return this._options.content;
	  };

	  Slot.prototype.getHtml = function getHtml() {
	    if (!this._responseInformation || !this._responseInformation.rawResponse) {
	      return null;
	    }
	    var responseTokens = this._responseInformation.rawResponse.split('\n');
	    if (responseTokens.length < 2) {
	      return null;
	    }

	    return responseTokens[1];
	  };

	  Slot.prototype.renderIframe = function renderIframe() {
	    var adCode = this.getHtml();
	    if (!adCode) {
	      return;
	    }
	    var containerElement = document.getElementById(this.getSlotElementId());

	    if (!containerElement) {
	      return;
	    }

	    var iframe = document.createElement('iframe');
	    containerElement.appendChild(iframe);
	    iframe.id = this.getAdUnitPath();

	    iframe.contentDocument.open();
	    var ad = adCode.replace(/\\\\n/g, 'slashn');
	    ad = ad.replace(/\\n/g, '');
	    ad = ad.replace('slashn', '\\n');
	    iframe.contentDocument.write(ad);
	    iframe.contentDocument.close();
	  };

	  return Slot;
	}();

	exports['default'] = Slot;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.isGeneralSize = isGeneralSize;
	exports.toSizes = toSizes;

	var _SingleSize = __webpack_require__(8);

	var SingleSize = _interopRequireWildcard(_SingleSize);

	var _MultiSize = __webpack_require__(12);

	var MultiSize = _interopRequireWildcard(_MultiSize);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	/**
	 * Returns true if the given object is a {@link GeneralSize}.
	 *
	 * @private
	 *
	 * @param {GeneralSize|*} obj The object to test
	 */
	/**
	 * Represents either a [W, H] {@link SingleSize}, {@link NamedSize} or {@link MultiSize}.
	 *
	 * @private
	 *
	 * @typedef {SingleSize|MultiSize} GeneralSize
	 */
	function isGeneralSize(obj) {
	  return obj != null && (SingleSize.isSingleSize(obj) || MultiSize.isMultiSize(obj));
	}

	/**
	 * Returns an array of {@link Size} instances from the {@link GeneralSize}.
	 *
	 * @private
	 *
	 * @param {GeneralSize|*} obj The object to convert.
	 * @returns {Array<Size>} The {@link Size} instances or empty array if the object
	 * is not a {@link GeneralSize}.
	 */
	function toSizes(obj) {
	  if (obj == null || Array.isArray(obj) && obj.length == 0) {
	    return [];
	  } else if (SingleSize.isSingleSize(obj)) {
	    return [SingleSize.toSize(obj)];
	  } else if (MultiSize.isMultiSize(obj)) {
	    return MultiSize.toSizes(obj);
	  } else {
	    return [];
	  }
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.isSingleSize = isSingleSize;
	exports.toSize = toSize;

	var _SingleSizeArray = __webpack_require__(9);

	var SingleSizeArray = _interopRequireWildcard(_SingleSizeArray);

	var _NamedSize = __webpack_require__(11);

	var NamedSize = _interopRequireWildcard(_NamedSize);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	/**
	 * Returns true if the given object is a {@link SingleSize}.
	 *
	 * @private
	 * @param {SingleSize|*} obj The object to test
	 */
	/**
	 * @typedef {SingleSizeArray|NamedSize} SingleSize
	 * @private
	 */
	function isSingleSize(obj) {
	  return obj != null && (SingleSizeArray.isSingleSizeArray(obj) || NamedSize.isNamedSize(obj));
	}

	/**
	 * Returns a {@link Size} instance from the {@link SingleSize}.
	 *
	 * @private
	 * @param {SingleSize|*} obj The object to convert.
	 * @returns {?Size} The {@link Size} instance or null if the object is not a {@link SingleSizeArray}.
	 */
	function toSize(obj) {
	  if (SingleSizeArray.isSingleSizeArray(obj)) {
	    return SingleSizeArray.toSize(obj);
	  } else {
	    return null;
	  }
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.isSingleSizeArray = isSingleSizeArray;
	exports.toSize = toSize;

	var _Size = __webpack_require__(10);

	var _Size2 = _interopRequireDefault(_Size);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Returns true if the given object is a {@link SingleSizeArray}.
	 *
	 * @private
	 * @param {SingleSizeArray|*} obj The object to test
	 */
	function isSingleSizeArray(obj) {
	  if (obj == null || !Array.isArray(obj) || obj.length !== 2) {
	    return false;
	  }

	  var w = obj[0],
	      h = obj[1];

	  return isInteger(w) && isInteger(h);
	}

	/**
	 * Returns a {@link Size} instance from the {@link SingleSizeArray}.
	 *
	 * @private
	 * @param {SingleSizeArray|*} obj The object to convert.
	 * @returns {?Size} The {@link Size} instance or null if the object is not
	 * a {@link SingleSizeArray}.
	 */
	/**
	 * Array of two numbers representing [width, height].
	 * @typedef {Array<number>} SingleSizeArray
	 * @private
	 */
	function toSize(obj) {
	  if (isSingleSizeArray(obj)) {
	    var w = obj[0],
	        h = obj[1];

	    return new _Size2['default'](w, h);
	  } else {
	    return null;
	  }
	}

	/**
	 * Returns true if the specified parameter is an integer.
	 *
	 * @private
	 * @param {*} n The value to check
	 * @returns {boolean} True if the value is an integer.
	 */
	function isInteger(n) {
	  return typeof n === 'number' && n % 1 === 0;
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Size captures a two dimensional size.
	 *
	 * @experimental
	 */
	var Size = function () {
	  /**
	   * Creates a new {@link Size} instance.
	   *
	   * @param {number} width The width
	   * @param {number} height The height
	   */
	  function Size(width, height) {
	    _classCallCheck(this, Size);

	    /**
	     * The width
	     * @type {number}
	     */
	    this.width = width;

	    /**
	     * The height
	     * @type {number}
	     */
	    this.height = height;
	  }

	  /**
	   * Gets the width in pixels.
	   *
	   * @type {number} The width in pixels
	   */


	  Size.prototype.getWidth = function getWidth() {
	    return this.width;
	  };

	  /**
	   * Gets the height in pixels.
	   *
	   * @type {number} The height in pixels
	   */


	  Size.prototype.getHeight = function getHeight() {
	    return this.height;
	  };

	  /**
	   * Returns whether the {@link Size} is empty.
	   *
	   * @experimental
	   * @type {boolean} true if the size is empty.
	   */


	  Size.prototype.isEmpty = function isEmpty() {
	    return !(this.width * this.height);
	  };

	  /**
	   * Truncates the width and height upward.
	   *
	   * @experimental
	   * @type {Size} The instance called
	   */


	  Size.prototype.ceil = function ceil() {
	    this.width = Math.ceil(this.width);
	    this.height = Math.ceil(this.height);
	    return this;
	  };

	  /**
	   * Truncates the width and height downard.
	   *
	   * @experimental
	   * @type {Size} The instance called
	   */


	  Size.prototype.floor = function floor() {
	    this.width = Math.floor(this.width);
	    this.height = Math.floor(this.height);
	    return this;
	  };

	  /**
	   * Rounds the width and height.
	   *
	   * @experimental
	   * @type {Size} The instance called
	   */


	  Size.prototype.round = function round() {
	    this.width = Math.round(this.width);
	    this.height = Math.round(this.height);
	    return this;
	  };

	  return Size;
	}();

	exports["default"] = Size;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.isNamedSize = isNamedSize;
	/**
	 * Named sizes that a slot can have. In most cases size is a fixed-size rectangle
	 * but there are some cases when we need other kinds of size specifications.
	 *
	 * Only the following are valid named sizes:
	 * * 'fluid': the ad container takes 100% width of parent div and then resizes
	 *   its height to fit creative content. Similar to how regular block elements
	 *   on a page behave. Used for native ads (see related article
	 *   https://support.google.com/dfp_premium/answer/6366905).
	 *
	 * @typedef {string} NamedSize
	 * @private
	 */

	/**
	 * Returns true if the given object is a {@link NamedSize}.
	 *
	 * @private
	 * @param {NamedSize|*} obj The object to test
	 */
	function isNamedSize(obj) {
	  return obj === 'fluid';
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.isMultiSize = isMultiSize;
	exports.toSizes = toSizes;

	var _SingleSize = __webpack_require__(8);

	var SingleSize = _interopRequireWildcard(_SingleSize);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	/**
	 * Returns true if the given object is a {@link MultiSize}.
	 *
	 * @private
	 * @param {MultiSize|*} obj The object to test
	 */
	function isMultiSize(obj) {
	  if (!Array.isArray(obj)) {
	    return false;
	  }

	  for (var _iterator = obj, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	    var _ref;

	    if (_isArray) {
	      if (_i >= _iterator.length) break;
	      _ref = _iterator[_i++];
	    } else {
	      _i = _iterator.next();
	      if (_i.done) break;
	      _ref = _i.value;
	    }

	    var ele = _ref;

	    if (!SingleSize.isSingleSize(ele)) {
	      return false;
	    }
	  }

	  return true;
	}

	/**
	 * Returns an array of {@link Size} instances from the {@link MultiSize}.
	 *
	 * @private
	 * @param {MultiSize|*} obj The object to convert.
	 * @returns {Array<Size>} The {@link Size} instances or empty array if the object
	 * is not a {@link MultiSize}.
	 */
	/**
	 * @typedef {Array<!SingleSize>} MultiSize
	 * @private
	 */
	function toSizes(obj) {
	  var acc = [];

	  if (!Array.isArray(obj)) {
	    return acc;
	  }

	  for (var _iterator2 = obj, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	    var _ref2;

	    if (_isArray2) {
	      if (_i2 >= _iterator2.length) break;
	      _ref2 = _iterator2[_i2++];
	    } else {
	      _i2 = _iterator2.next();
	      if (_i2.done) break;
	      _ref2 = _i2.value;
	    }

	    var ele = _ref2;

	    var size = SingleSize.toSize(ele);
	    if (size != null) {
	      acc.push(size);
	    } else {
	      return [];
	    }
	  }

	  return acc;
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.isSizeMappingArray = isSizeMappingArray;

	var _SizeMapping = __webpack_require__(14);

	var SizeMapping = _interopRequireWildcard(_SizeMapping);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	/**
	 * Returns true if the object is a {@link SizeMappingArray}.
	 *
	 * @private
	 * @param {SizeMappingArray|*} obj The object to test
	 */
	function isSizeMappingArray(obj) {
	  if (!Array.isArray(obj)) {
	    return false;
	  }

	  for (var _iterator = obj, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	    var _ref;

	    if (_isArray) {
	      if (_i >= _iterator.length) break;
	      _ref = _iterator[_i++];
	    } else {
	      _i = _iterator.next();
	      if (_i.done) break;
	      _ref = _i.value;
	    }

	    var ele = _ref;

	    if (!SizeMapping.isSizeMapping(ele)) {
	      return false;
	    }
	  }

	  return true;
	} /**
	   * @typedef {Array<!SizeMapping>} SizeMappingArray
	   * @private
	   */

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.isSizeMapping = isSizeMapping;

	var _GeneralSize = __webpack_require__(7);

	var GeneralSize = _interopRequireWildcard(_GeneralSize);

	var _SingleSizeArray = __webpack_require__(9);

	var SingleSizeArray = _interopRequireWildcard(_SingleSizeArray);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	/**
	 * Returns true if the object is a {@link SizeMapping}.
	 *
	 * @private
	 * @param {SizeMapping|*} obj The object to test
	 */
	/**
	 * Each size mapping is an array of two elements: {@link SingleSizeArray} and
	 * {@link GeneralSize}.
	 *
	 * @typedef {Array<SingleSizeArray|GeneralSize>} SizeMapping
	 * @private
	 */
	function isSizeMapping(obj) {
	  if (!Array.isArray(obj) || obj.length !== 2) {
	    return false;
	  }

	  var viewport = obj[0],
	      mappings = obj[1];


	  return SingleSizeArray.isSingleSizeArray(viewport) && GeneralSize.isGeneralSize(mappings);
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This event is fired when an impression becomes viewable, according to the
	 * Active View criteria.
	 */
	var ImpressionViewableEvent = function () {
	  /**
	   * Constructs a new ImpressionViewableEvent instance.
	   *
	   * @param {string} serviceName Name of the service that rendered the slot.
	   * @param {!Slot} slot The slot which contains the impression that became viewable.
	   */
	  function ImpressionViewableEvent(serviceName, slot) {
	    _classCallCheck(this, ImpressionViewableEvent);

	    this._serviceName = serviceName;
	    this._slot = slot;
	  }

	  /**
	   * Name of the event.
	   *
	   * @private
	   * @type {string}
	   */


	  _createClass(ImpressionViewableEvent, [{
	    key: '_name',
	    get: function get() {
	      return 'googletag.events.ImpressionViewableEvent';
	    }

	    /**
	     * Name of the service that rendered the slot.
	     *
	     * @type {string}
	     */

	  }, {
	    key: 'serviceName',
	    get: function get() {
	      return this._serviceName;
	    }

	    /**
	     * The slot which contains the impression that became viewable.
	     *
	     * @type {!Slot}
	     */

	  }, {
	    key: 'slot',
	    get: function get() {
	      return this._slot;
	    }
	  }]);

	  return ImpressionViewableEvent;
	}();

	exports['default'] = ImpressionViewableEvent;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This event is fired when the creative's iframe fires its load event. When
	 * rendering rich media ads in sync rendering mode, no iframe is used so no
	 * SlotOnLoadEvent will be fired.
	 */
	var SlotOnloadEvent = function () {
	  /**
	   * Creates a new SlotOnloadEvent instance.
	   *
	   * @param {string} serviceName Name of the service that rendered the slot.
	   * @param {!Slot} slot The slot in which the creative was loaded.
	   */
	  function SlotOnloadEvent(serviceName, slot) {
	    _classCallCheck(this, SlotOnloadEvent);

	    this._serviceName = serviceName;
	    this._slot = slot;
	  }

	  /**
	   * Name of the event.
	   *
	   * @private
	   * @type {string}
	   */


	  _createClass(SlotOnloadEvent, [{
	    key: '_name',
	    get: function get() {
	      return 'googletag.events.SlotOnloadEvent';
	    }

	    /**
	     * Name of the service that rendered the slot.
	     *
	     * @type {string}
	     */

	  }, {
	    key: 'serviceName',
	    get: function get() {
	      return this._serviceName;
	    }

	    /**
	     * The slot in which the creative was loaded.
	     *
	     * @type {!Slot}
	     */

	  }, {
	    key: 'slot',
	    get: function get() {
	      return this._slot;
	    }
	  }]);

	  return SlotOnloadEvent;
	}();

	exports['default'] = SlotOnloadEvent;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This event is fired when a slot on the page has finished rendering. The event
	 * is fired by the service that rendered the slot. Example: To listen to
	 * companion ads, add a listener to the companionAds service, not the pubads
	 * service.
	 */
	var SlotRenderEndedEvent = function () {
	  /**
	   * Creates a new SlotRenderEndedEvent instance.
	   *
	   * @param {string} serviceName Name of the service that rendered the slot.
	   * @param {!Slot} slot The slot in which the creative was rendered.
	   * @param {?number} creativeId Creative ID of the rendered ad. Value is null
	   * for empty slots, backfill ads or creatives rendered by services other than pubads service.
	   * @param {?number} lineItemId Line item ID of the rendered ad. Value is null
	   * for empty slots, backfill ads or creatives rendered by services other than pubads service.
	   * @param {boolean} isEmpty true if no ad was returned for the slot, false otherwise.
	   * @param {SingleSize} size Indicates the pixel size of the rendered
	   * creative. Example: [728, 90]. Value is null for empty ad slots.
	   */
	  function SlotRenderEndedEvent(serviceName, slot, creativeId, lineItemId, isEmpty, size) {
	    _classCallCheck(this, SlotRenderEndedEvent);

	    this._serviceName = serviceName;
	    this._slot = slot;
	    this._creativeId = creativeId;
	    this._isEmpty = isEmpty;
	    this._lineItemId = lineItemId;
	    this._size = size;
	  }

	  /**
	   * Name of the event.
	   *
	   * @private
	   * @type {string}
	   */


	  _createClass(SlotRenderEndedEvent, [{
	    key: '_name',
	    get: function get() {
	      return 'slotRenderEnded';
	    }

	    /**
	     * Name of the service that rendered the slot.
	     *
	     * @type {string}
	     */

	  }, {
	    key: 'serviceName',
	    get: function get() {
	      return this._serviceName;
	    }

	    /**
	     * The slot in which the creative was rendered.
	     *
	     * @type {!Slot}
	     */

	  }, {
	    key: 'slot',
	    get: function get() {
	      return this._slot;
	    }

	    /**
	     * Creative ID of the rendered ad. Value is null for empty slots, backfill ads
	     * or creatives rendered by services other than pubads service.
	     *
	     * @type {?number}
	     */

	  }, {
	    key: 'creativeId',
	    get: function get() {
	      return this._creativeId;
	    }

	    /**
	     * true if no ad was returned for the slot, false otherwise.
	     *
	     * @type {boolean}
	     */

	  }, {
	    key: 'isEmpty',
	    get: function get() {
	      return this._isEmpty;
	    }

	    /**
	     * Line item ID of the rendered ad. Value is null for empty slots, backfill
	     * ads or creatives rendered by services other than pubads service.
	     *
	     * @type {?number}
	     */

	  }, {
	    key: 'lineItemId',
	    get: function get() {
	      return this._lineItemId;
	    }

	    /**
	     * Indicates the pixel size of the rendered creative. Example: [728, 90].
	     * Value is null for empty ad slots.
	     *
	     * @type {SingleSize}
	     */

	  }, {
	    key: 'size',
	    get: function get() {
	      return this._size;
	    }
	  }]);

	  return SlotRenderEndedEvent;
	}();

	exports['default'] = SlotRenderEndedEvent;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This event is fired whenever the on-screen percentage of an ad slot's area
	 * changes. The event is throttled and will not fire more often than once every
	 * 200ms.
	 */
	var SlotVisibilityChangedEvent = function () {
	  /**
	   * Creates a new SlotVisibilityChangedEvent instance.
	   *
	   * @param {string} serviceName Name of the service that owns the slot.
	   * @param {!Slot} slot The slot whose visibility changed.
	   * @param {number} inViewPercentage The percentage (0-100) of the ad's area that is visible.
	   */
	  function SlotVisibilityChangedEvent(serviceName, slot, inViewPercentage) {
	    _classCallCheck(this, SlotVisibilityChangedEvent);

	    this._serviceName = serviceName;
	    this._slot = slot;
	    this._inViewPercentage = inViewPercentage;
	  }

	  /**
	   * Name of the event.
	   *
	   * @private
	   * @type {string}
	   */


	  _createClass(SlotVisibilityChangedEvent, [{
	    key: '_name',
	    get: function get() {
	      return 'googletag.events.SlotVisibilityChangedEvent';
	    }

	    /**
	     * Name of the service that rendered the slot.
	     *
	     * @type {string}
	     */

	  }, {
	    key: 'serviceName',
	    get: function get() {
	      return this._serviceName;
	    }

	    /**
	     * The slot which contains the impression that became viewable.
	     *
	     * @type {!Slot}
	     */

	  }, {
	    key: 'slot',
	    get: function get() {
	      return this._slot;
	    }

	    /**
	     * The percentage of the ad that is "in view".
	     *
	     * @type {number}
	     */

	  }, {
	    key: 'inViewPercentage',
	    get: function get() {
	      return this._inViewPercentage;
	    }
	  }]);

	  return SlotVisibilityChangedEvent;
	}();

	exports['default'] = SlotVisibilityChangedEvent;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This event is fired when an ad response has been received for a particular slot.
	 */
	var SlotResponseReceivedEvent = function () {
	  /**
	   * Creates a new SlotResponseReceivedEvent instance.
	   *
	   * @param {string} serviceName Name of the service that triggered the event.
	   * @param {!Slot} slot The slot that triggered the event.
	   */
	  function SlotResponseReceivedEvent(serviceName, slot) {
	    _classCallCheck(this, SlotResponseReceivedEvent);

	    this._serviceName = serviceName;
	    this._slot = slot;
	  }

	  /**
	   * Name of the event.
	   *
	   * @private
	   * @type {string}
	   */


	  _createClass(SlotResponseReceivedEvent, [{
	    key: '_name',
	    get: function get() {
	      return 'slotResponseReceived';
	    }

	    /**
	     * Name of the service that rendered the slot.
	     *
	     * @type {string}
	     */

	  }, {
	    key: 'serviceName',
	    get: function get() {
	      return this._serviceName;
	    }

	    /**
	     * The slot in which the creative was rendered.
	     *
	     * @type {!Slot}
	     */

	  }, {
	    key: 'slot',
	    get: function get() {
	      return this._slot;
	    }
	  }]);

	  return SlotResponseReceivedEvent;
	}();

	exports['default'] = SlotResponseReceivedEvent;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * The SlotId collects several identifiers for a Slot.
	 *
	 * @experimental
	 */
	var SlotId = function () {
	  /**
	   * Creates a new {@link SlotId} instance.
	   *
	   * @param {string} adUnitPath The ad unit path of the slot.
	   * @param {number} instance The instance number of the slot.
	   * @param {?string} [optDomId] The DOM ID of the slot.
	   */
	  function SlotId(adUnitPath, instance, optDomId) {
	    _classCallCheck(this, SlotId);

	    this._adUnitPath = adUnitPath;
	    this._instance = instance;
	    this._domId = optDomId || "gpt_unit_" + adUnitPath + "_" + instance;
	  }

	  /**
	   * The name of the {@link Slot}.
	   *
	   * @returns {string} The name of the {@link Slot}.
	   */


	  SlotId.prototype.getName = function getName() {
	    return this._adUnitPath;
	  };

	  /**
	   * The AdUnitPath of the {@link Slot}.
	   *
	   * @returns {string} The AdUnitPath of the {@link Slot}.
	   */


	  SlotId.prototype.getAdUnitPath = function getAdUnitPath() {
	    return this._adUnitPath;
	  };

	  /**
	   * The DOM Id of the {@link Slot}.
	   *
	   * @returns {string} The DOM Id of the {@link Slot}.
	   */


	  SlotId.prototype.getDomId = function getDomId() {
	    return this._domId;
	  };

	  /**
	   * The ID of the {@link Slot}.
	   *
	   * @returns {string} The ID of the {@link Slot}.
	   */


	  SlotId.prototype.getId = function getId() {
	    return this._adUnitPath + "_" + this._instance;
	  };

	  /**
	   * The instance number of the {@link Slot}.
	   *
	   * @returns {number} The instance number of the {@link Slot}.
	   */


	  SlotId.prototype.getInstance = function getInstance() {
	    return this._instance;
	  };

	  /**
	   * Converts the {@link SlotId} to a String.
	   *
	   * @override
	   * @returns {string} A String representation.
	   */


	  SlotId.prototype.toString = function toString() {
	    return this.getId();
	  };

	  return SlotId;
	}();

	exports["default"] = SlotId;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Manages setting and retrieving targeting.
	 *
	 * @experimental
	 */
	var TargetingMap = function () {
	  /**
	   * Creates a new {@link TargetingMap} instance.
	   */
	  function TargetingMap() {
	    _classCallCheck(this, TargetingMap);

	    this._targeting = {};
	  }

	  /**
	   * Sets custom targeting parameters for a given key.
	   *
	   * @param {string} key Targeting parameter key.
	   * @param {string|!Array<string>} value Targeting parameter value or array of values.
	   */


	  TargetingMap.prototype.set = function set(key, value) {
	    if (Array.isArray(value)) {
	      this._targeting[key] = value;
	    } else {
	      this._targeting[key] = [value];
	    }
	  };

	  /**
	   * Returns a specific targeting parameter that has been set.
	   *
	   * @param {string} key The targeting key to look for.
	   * @returns {!Array<string>} The values associated with this key, or an empty
	   * array if there is no such key.
	   */


	  TargetingMap.prototype.get = function get(key) {
	    return this._targeting[key] || [];
	  };

	  /**
	   * Returns the list of all targeting keys that have been set.
	   *
	   * @returns {!Array<string>} Array of targeting keys. Ordering is undefined.
	   */


	  TargetingMap.prototype.keys = function keys() {
	    return Object.keys(this._targeting);
	  };

	  /**
	   * Clears custom targeting parameters for a given key.
	   *
	   * @param {string} [key] Targeting parameter key.
	   */


	  TargetingMap.prototype.clear = function clear(key) {
	    if (key == null) {
	      this._targeting = {};
	    } else {
	      delete this._targeting[key];
	    }
	  };

	  /**
	   * Returns the current targeting key-value dictionary.
	   *
	   * @returns {Object<string, Array<string>>} the targeting map.
	   */


	  TargetingMap.prototype.all = function all() {
	    return _extends({}, this._targeting);
	  };

	  return TargetingMap;
	}();

	exports["default"] = TargetingMap;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _SizeMappingArray = __webpack_require__(13);

	var SizeMappingArray = _interopRequireWildcard(_SizeMappingArray);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Builder for size mapping specification objects. This builder is provided to
	 * help easily construct size specifications.
	 */
	var SizeMappingBuilder = function () {
	  /**
	   * Creates a new {@link SizeMappingBuilder}.
	   */
	  function SizeMappingBuilder() {
	    _classCallCheck(this, SizeMappingBuilder);

	    this._mappings = [];
	  }

	  /**
	   * Adds a mapping from a {@link SingleSizeArray} representing the viewport to
	   * {@link GeneralSize} representing the slot.
	   *
	   * @param {SingleSizeArray} viewportSize The size of the viewport for this mapping entry.
	   * @param {GeneralSize} slotSize The sizes of the slot for this mapping entry.
	   * @returns {SizeMappingBuilder} A reference to this builder.
	   */


	  SizeMappingBuilder.prototype.addSize = function addSize(viewportSize, slotSize) {
	    this._mappings.push([viewportSize, slotSize]);
	    return this;
	  };

	  /**
	   * Builds a size map specification from the mappings added to this builder. If
	   * any invalid mappings have been supplied, this method will return null.
	   * Otherwise it returns a specification in the correct format to pass to
	   * {@link Slot#defineSizeMapping()}. The behavior of the builder after
	   * calling {@link SizeMappingBuilder#build} is undefined.
	   *
	   * @returns {?SizeMappingArray} The result built by this builder. Can be null
	   * if invalid size mappings were supplied.
	   */


	  SizeMappingBuilder.prototype.build = function build() {
	    if (this._mappings.length > 0 && SizeMappingArray.isSizeMappingArray(this._mappings)) {
	      var mappings = this._mappings;
	      this._mappings = [];
	      return mappings;
	    } else {
	      return null;
	    }
	  };

	  return SizeMappingBuilder;
	}();

	exports['default'] = SizeMappingBuilder;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * The command array accepts a sequence of functions and invokes them in order.
	 * It is intended to replace a standard array that is used to enqueue functions
	 * to be invoked once GPT is loaded.
	 */
	var CommandArray = function () {
	  /**
	   * Creates a new {@link CommandArray}.
	   *
	   * @param {Array<function()>} commands The commands to execute
	   */
	  function CommandArray(commands) {
	    _classCallCheck(this, CommandArray);

	    this._count = 0;
	    for (var _iterator = commands, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var f = _ref;

	      this.push(f);
	    }
	  }

	  /**
	   * Executes the sequence of functions specified in the arguments in order.
	   *
	   * @param {function()} f A JavaScript function to be executed.
	   * @returns {number} The number of commands processed so far. This is
	   * compatible with {@link Array#push}'s return value (the current length of the array).
	   */


	  CommandArray.prototype.push = function push(f) {
	    if (f != null && typeof f === 'function') {
	      f();
	      this._count += 1;
	    }
	    return this._count;
	  };

	  return CommandArray;
	}();

	exports['default'] = CommandArray;

/***/ }
/******/ ]);
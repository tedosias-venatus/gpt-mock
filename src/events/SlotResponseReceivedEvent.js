/**
 * This event is fired when an ad response has been received for a particular slot.
 */
export default class SlotResponseReceivedEvent {
  /**
   * Creates a new SlotResponseReceivedEvent instance.
   *
   * @param {string} serviceName Name of the service that triggered the event.
   * @param {!Slot} slot The slot that triggered the event.
   */
  constructor(serviceName, slot) {
    this._serviceName = serviceName;
    this._slot = slot;
  }

  /**
   * Name of the event.
   *
   * @private
   * @type {string}
   */
  get _name() {
    return 'slotResponseReceived';
  }

  /**
   * Name of the service that rendered the slot.
   *
   * @type {string}
   */
  get serviceName() {
    return this._serviceName;
  }

  /**
   * The slot in which the creative was rendered.
   *
   * @type {!Slot}
   */
  get slot() {
    return this._slot;
  }
}

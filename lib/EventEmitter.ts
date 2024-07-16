import Validator from './Validator';

/**
 * EventEmitter class for managing and emitting events.
 * @typeparam T - The event registry type extending EventRegistry.
 */
export default class EventEmitter<T extends EventRegistry<T> = EventRegistryMap> {
  private readonly _events: Map<keyof T, Set<EventCallback<Parameters<T[keyof T]>>>> = new Map();

  /**
   * Get the map of events being managed by the EventEmitter.
   * @returns A readonly Map of event names to their corresponding Set of listeners.
   */
  public get events(): ReadonlyMap<keyof T, Set<EventCallback<Parameters<T[keyof T]>>>> {
    return this._events;
  }

  /**
   * Add a listener for the specified event.
   * @param name - The name of the event.
   * @param listener - The listener function to add.
   * @param emitLimit - Optional. The maximum number of times the listener can be emitted.
   * @returns This EventEmitter instance for chaining.
   */
  public on<K extends keyof T>(name: K, listener: EventCallback<Parameters<T[K]>>, emitLimit: number = Infinity): this {
    Validator.string(name);
    Validator.function(listener);
    Validator.number(emitLimit);

    if (!this._events.has(name)) this._events.set(name, new Set());

    this._events.get(name)!.add(this.constructor.decorate(listener, { emitLimit, emitTimes: 0 }));

    return this;
  }

  /**
   * Add a one-time listener for the specified event.
   * @param name - The name of the event.
   * @param listener - The listener function to add.
   * @returns This EventEmitter instance for chaining.
   */
  public once<K extends keyof T>(name: K, listener: EventCallback<Parameters<T[K]>>): this {
    Validator.function(listener);

    return this.on(name, listener, 1);
  }

  /**
   * Remove a listener for the specified event.
   * @param name - The name of the event.
   * @param listener - The listener function to remove.
   * @returns This EventEmitter instance for chaining.
   */
  public off<K extends keyof T>(name: K, listener: T[K]): this {
    Validator.string(name);
    Validator.function(listener);

    if (!this._events.has(name)) return this;

    const listeners = this._events.get(name)!;
    listeners.delete(listener);

    if (!listeners.size) this._events.delete(name);

    return this;
  }

  /**
   * Emit an event with the given arguments.
   * @param event - The name of the event to emit.
   * @param args - Arguments to pass to the event listeners.
   * @returns True if listeners were called, false if no listeners for the event.
   */
  public emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): boolean {
    if (!this._events.has(event)) return false;

    for (const listener of this._events.get(event)!) {
      if (listener.emitTimes >= listener.emitLimit) continue;

      listener(...args);

      this.constructor.decorate(listener, { emitted: true, emitTimes: ++listener.emitTimes });
    }

    return true;
  }

  /**
   * Remove all listeners for a specific event, or all events if no event name is provided.
   * @param name - Optional. The name of the event to remove listeners from.
   * @returns This EventEmitter instance for chaining.
   */
  public removeAllListeners<K extends keyof T>(name?: K): this {
    if (name) this._events.delete(name);
    else this._events.clear();

    return this;
  }

  /**
   * Get the number of listeners for a specific event.
   * @param name - The name of the event.
   * @returns The number of listeners for the event.
   */
  public listenerCount<K extends keyof T>(name: K): number {
    if (!this._events.has(name)) return 0;

    return this._events.get(name)!.size;
  }

  /**
   * Get an array of all event names this EventEmitter is handling.
   * @returns An array of event names.
   */
  public eventNames<K extends keyof T>(): K[] {
    return Array.from(this._events.keys()) as K[];
  }

  /**
   * Check if a listener has been emitted.
   * @param listener - The listener function to check.
   * @returns True if the listener has been emitted, false otherwise.
   */
  public isEmitted(listener: any): boolean {
    return !!listener.emitted;
  }

  /**
   * Decorate a listener with additional properties.
   * @param listener - The listener function to decorate.
   * @param values - Additional properties to set on the listener.
   * @returns The decorated listener function.
   */
  static decorate(listener: any, values: any): any {
    Validator.function(listener);
    Validator.object(values);

    for (const key in values) Object.defineProperty(listener, key, { value: values[key], configurable: false, enumerable: false, writable: true });

    return listener;
  }
}
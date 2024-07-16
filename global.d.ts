/// <reference path="./@types">

declare module 'erfevents' {
  /**
   * Class representing an EventEmitter for managing and emitting events.
   * @typeparam T - The event registry type extending EventRegistry.
   */
  class EventEmitter<T extends EventRegistry<T> = EventRegistryMap> {
    private readonly _events: Map<keyof T, Set<EventCallback<Parameters<T[keyof T]>>>>;

    /**
     * Get the map of events being managed by the EventEmitter.
     * @returns A readonly Map of event names to their corresponding Set of listeners.
     */
    public readonly events: ReadonlyMap<keyof T, Set<EventCallback<Parameters<T[keyof T]>>>>;

    /**
     * Add a listener for the specified event.
     * @param name - The name of the event.
     * @param listener - The listener function to add.
     * @param emitLimit - Optional. The maximum number of times the listener can be emitted.
     * @returns This EventEmitter instance for chaining.
     */
    public on<K extends keyof T>(name: K, listener: EventCallback<Parameters<T[K]>>, emitLimit?: number): this;

    /**
     * Add a one-time listener for the specified event.
     * @param name - The name of the event.
     * @param listener - The listener function to add.
     * @returns This EventEmitter instance for chaining.
     */
    public once<K extends keyof T>(name: K, listener: EventCallback<Parameters<T[K]>>): this;

    /**
     * Remove a listener for the specified event.
     * @param name - The name of the event.
     * @param listener - The listener function to remove.
     * @returns This EventEmitter instance for chaining.
     */
    public off<K extends keyof T>(name: K, listener: T[K]): this;

    /**
     * Emit an event with the given arguments.
     * @param event - The name of the event to emit.
     * @param args - Arguments to pass to the event listeners.
     * @returns True if listeners were called, false if no listeners for the event.
     */
    public emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): boolean;

    /**
     * Remove all listeners for a specific event, or all events if no event name is provided.
     * @param name - Optional. The name of the event to remove listeners from.
     * @returns This EventEmitter instance for chaining.
     */
    public removeAllListeners<K extends keyof T>(name?: K): this;

    /**
     * Get the number of listeners for a specific event.
     * @param name - The name of the event.
     * @returns The number of listeners for the event.
     */
    public listenerCount<K extends keyof T>(name: K): number;

    /**
     * Get an array of all event names this EventEmitter is handling.
     * @returns An array of event names.
     */
    public eventNames<K extends keyof T>(): K[];

    /**
     * Check if a listener has been emitted.
     * @param listener - The listener function to check.
     * @returns True if the listener has been emitted, false otherwise.
     */
    public isEmitted(listener: any): boolean;

    /**
     * Decorate a listener with additional properties.
     * @param listener - The listener function to decorate.
     * @param values - Additional properties to set on the listener.
     * @returns The decorated listener function.
     */
    static decorate(listener: any, values: any): any;
  }

  import Shapeshift from '@sapphire/shapeshift';

  /**
   * Utility class for validating various data types using Sapphire's validation schemas.
   */
  class Validator {
    /**
     * Validation schema for strings.
     */
    static readonly StringValidation: Shapeshift.StringValidator<string>;

    /**
     * Validation schema for integers.
     */
    static readonly NumberValidation: Shapeshift.NumberValidator<number>;

    /**
     * Validation schema for nullish values (null or undefined).
     */
    static readonly NullishValidation: Shapeshift.NullishValidator;

    /**
     * Validation schema for any type of value.
     */
    static readonly AnyValidation: Shapeshift.PassthroughValidator<any>;

    /**
     * Validation schema for objects.
     */
    static readonly ObjectValidation: <T extends object>(shape: Shapeshift.MappedObjectValidator<T>, options?: Shapeshift.ValidatorOptions) => Shapeshift.ObjectValidator<T, Shapeshift.UndefinedToOptional<T>>;

    /**
     * Validation schema for URLs.
     */
    static readonly URLValidation: Shapeshift.InstanceValidator<URL>;

    /**
     * Validation schema for functions.
     */
    static readonly FunctionValidation: Shapeshift.InstanceValidator<Function>;

    /**
     * Validation schema for input against a list of string literals.
     */
    static readonly StringInputValidation: Shapeshift.UnionValidator<any> = (...values: any[]) => any;

    /**
     * Validation schema for instances.
     */
    static readonly InstanceValidation: <T>(expected: Shapeshift.Constructor<T>, options?: Shapeshift.ValidatorOptions) => Shapeshift.InstanceValidator<T>;

    /**
     * Validates a string.
     * @param value The input to validate.
     * @returns The validated string.
     */
    static string(value: any): any;

    /**
     * Validates a number.
     * @param value The input to validate.
     * @returns The validated number.
     */
    static number(value: any): any;

    /**
     * Validates nullish values (null or undefined).
     * @param value The input to validate.
     * @returns The validated nullish value.
     */
    static nullish(value: any): any;

    /**
     * Validates any type of value.
     * @param value The input to validate.
     * @returns The validated value.
     */
    static any(value: any): any;

    /**
     * Validates an object.
     * @param value The input to validate.
     * @returns The validated object.
     */
    static object(value: any): any;

    /**
     * Validates a URL instance.
     * @param value The input to validate.
     * @returns The validated URL instance.
     */
    static url(value: any): any;

    /**
     * Validates a function instance.
     * @param value The input to validate.
     * @returns The validated function instance.
     */
    static function(value: any): any;

    /**
     * Validates input against a list of string literals.
     * @param value The input to validate.
     * @returns The validated input against the list of string literals.
     */
    static stringInput(...value: any[]): any;

    /**
     * Validates an instance against a given class or constructor.
     * @param i The class or constructor function.
     * @param value The instance to validate.
     * @returns The validated instance.
     */
    static instance(i: any, value: any): any;
  }

  export { EventEmitter, Validator };
  export default EventEmitter;
}
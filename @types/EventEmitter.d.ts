interface EventCallback<T extends any[]> {
  (...args: T): void;
  emitted?: boolean;
  emitLimit?: number;
  emitTimes?: number;
}

type EventRegistry<L extends any> = {
  [key in keyof L]: EventListener;
}

interface EventRegistryMap {
  [key: string]: EventCallback;
}
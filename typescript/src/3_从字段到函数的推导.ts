type Watcher<T> = {
  on<K extends keyof T & string>(
    eventName: `${K}Changed`,
    callback: (oldValue: T[K], newValue: T[K]) => void
  ): void;
}

declare function watch<T>(obj:T): Watcher<T>;

const personWatcher = watch({
  firstName: 'Alice',
  lastName: 'Ronan',
  age: 12,
  sex: 'boy'
})
personWatcher.on<'age'>(
  'ageChanged',
  (oldValue,newValue) => {
    
  }
)
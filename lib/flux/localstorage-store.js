import Store from "flux/store";
const storage = window.localStorage;

function save(key, value={}) {
  storage.setItem(key, JSON.stringify(value));
}

function load(key) {
  const loadedJSON = storage.getItem(key);
  return loadedJSON ? JSON.parse(loadedJSON) : null;
}

export default class LocalStorageStore extends Store {
  constructor(namespace, data={}, ...args) {
    const loadedData = load(namespace);

    if(loadedData) {
      super(loadedData, ...args);
    } else {
      save(namespace, data);
      super(data, ...args);
    }

    this.stream.subscribe((data) => {
      save(namespace, data);
    });
  }
}

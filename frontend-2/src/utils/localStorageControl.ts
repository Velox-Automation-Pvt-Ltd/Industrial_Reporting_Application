const localStorageUtil = {
  set: (key: string, value: unknown): void => {
    try {
      if (value === undefined) {
        console.warn(
          `localStorageUtil.set: Skipping undefined value for key "${key}"`
        );
        return;
      }

      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving ${key} to localStorage`, error);
    }
  },

  get: <T>(key: string, fallback?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : fallback ?? null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage`, error);
      return fallback ?? null;
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },
};

export default localStorageUtil;

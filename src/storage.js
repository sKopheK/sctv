export const getStoredData = (key, fallback) => {
  const stored = localStorage.getItem(key);
  if (stored === null && fallback !== undefined) {
    return fallback;
  }
  return stored;
};
export const storeData = (key, value) => localStorage.setItem(key, value);
export const removeData = (key) => localStorage.removeItem(key);

export const getStoredData = (key, fallback) => ***REMOVED***
  const stored = localStorage.getItem(key);
  if (stored === null && fallback !== undefined) ***REMOVED***
    return fallback;
***REMOVED***
  return stored;
***REMOVED***;
export const storeData = (key, value) => localStorage.setItem(key, value);

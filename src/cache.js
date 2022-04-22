import { storeData, getStoredData, removeData } from './storage';

const EXPIRATION = 1000 * 60 * 60 * 24 * 7; // 7 days

const getNow = () => (new Date()).getTime();

export const get = (key) => {
  const stored = getStoredData(key);
  let parsed;
  try {
    parsed = JSON.parse(stored);
  } catch (e) {
    console.error('Unable to parse cached data for ', key);
    removeData(key);
    return null;
  }
  if (parsed === null
    || parsed.data === undefined
    || parsed.expiration === undefined) {
    return null;
  }
  if (parsed.expiration < getNow()) {
    removeData(key);
    return null;
  }
  return parsed.data;
};

export const set = (key, value) => {
  storeData(key, JSON.stringify({
    expiration: getNow() + EXPIRATION,
    data: value,
  }));
};

export const clear = (key) => removeData(key);

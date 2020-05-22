export const getStoredItem = (key) =>
  localStorage && JSON.parse(localStorage.getItem(key));

export const setStoredItem = (key, value) =>
  localStorage && localStorage.setItem(key, JSON.stringify(value));

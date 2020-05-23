/**
 * Gets an item in localStorage.
 * @param {string} key The localStorage key for the item being fetched.
 */
export const getStoredItem = (key) =>
  localStorage && JSON.parse(localStorage.getItem(key));

/**
 * Adds an item to localStorage.
 * @param {string} key The localStorage key for the item being fetched.
 * @param {string} value The value being stored to the specified key.
 */
export const setStoredItem = (key, value) =>
  localStorage && localStorage.setItem(key, JSON.stringify(value));

/**
 * Gets an item in localStorage.
 * @param key The localStorage key for the item being fetched.
 */
export const getStoredItem = (key: string) =>
  localStorage && JSON.parse(localStorage.getItem(key));

/**
 * Adds an item to localStorage.
 * @param key The localStorage key for the item being fetched.
 * @param value The value being stored to the specified key.
 */
export const setStoredItem = (key: string, value: unknown) =>
  localStorage && localStorage.setItem(key, JSON.stringify(value));

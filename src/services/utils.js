export const saveToSession = (key, update) =>
  sessionStorage.setItem(key, JSON.stringify(update));

export const getFromSession = (key) => JSON.parse(sessionStorage.getItem(key));

export const removeFromSession = (key) => sessionStorage.removeItem(key);

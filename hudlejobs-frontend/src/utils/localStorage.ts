export const setItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getItem = (key: string) => {
  return localStorage.getItem(key) || null;
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export const reset = () => {
  localStorage.clear();
};

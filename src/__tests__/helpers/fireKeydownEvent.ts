export default (key: string, options?: { [key: string]: string | boolean }) => {
  window.dispatchEvent(new KeyboardEvent('keydown', { key, ...options }));
};

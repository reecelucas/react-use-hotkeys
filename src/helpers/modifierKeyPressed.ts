export default (event: KeyboardEvent) =>
  event.altKey || event.ctrlKey || event.shiftKey || event.metaKey;

export default (event: KeyboardEvent): string[] => {
  const modifiers = [];

  if (event.ctrlKey) {
    modifiers.push('ctrlKey');
  }

  if (event.shiftKey) {
    modifiers.push('shiftKey');
  }

  if (event.altKey) {
    modifiers.push('altKey');
  }

  if (event.metaKey) {
    modifiers.push('metaKey');
  }

  return modifiers;
};

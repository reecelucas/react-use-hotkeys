export default (hotkeys: string): string[] => {
  const hkeys = hotkeys.toLowerCase();

  if (hkeys.length === 1) {
    // We're dealing with a single key
    return [hkeys];
  }

  if (hkeys.includes('+')) {
    // We're dealing with a modifier-key combination
    return hkeys.replace(/\s+/g, '').split('+');
  }

  // We're dealing with a key sequence
  return hkeys
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');
};

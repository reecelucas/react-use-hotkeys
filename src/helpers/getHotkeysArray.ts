export default (hotkeys: string): string[] => {
  const hkeys = hotkeys.toLowerCase();

  if (hkeys.length === 1) {
    // We're dealing with a single key
    return [hkeys];
  }

  if (hkeys.includes("+")) {
    // We're dealing with a modifier-key combination. The `/\b\+/g` regex
    // matches the first `+` at the end of each word, allowing combinations including `+`,
    // E.g. `Shift++`. We can't use a negative lookbehind because of lack of support.
    return hkeys.replace(/\s+/g, "").split(/\b\+/g);
  }

  /**
   * We're dealing with a key sequence, so split on spaces.
   * If the whitespace character is within quotation marks (" " or ' ')
   * it signifies a space key and not a delimeter.
   */
  return [...(hkeys.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g) || [])].map((key) =>
    key.replace(/("|').*?("|')/, " ")
  );
};

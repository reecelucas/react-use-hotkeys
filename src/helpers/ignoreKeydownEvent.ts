import modifierKeyPressed from "./modifierKeyPressed";

const ELEMENTS_TO_IGNORE = ["INPUT", "TEXTAREA"] as const;

export type ElementsToIgnore = typeof ELEMENTS_TO_IGNORE[number];

export default (
  event: KeyboardEvent,
  enableOnContentEditable?: boolean,
  ignoredElementWhitelist?: ElementsToIgnore[]
) => {
  /**
   * Chrome autocomplete triggers `keydown` event but `event.key` will be undefined.
   * See https://bugs.chromium.org/p/chromium/issues/detail?id=581537.
   */
  if (!event.key && !modifierKeyPressed(event)) {
    return true;
  }

  const target = (event.target || {}) as HTMLElement;

  /**
   * Ignore the keydown event if it originates from a `contenteditable`
   * element, unless the user has overridden this behaviour.
   */
  if (target.isContentEditable && !enableOnContentEditable) {
    return true;
  }

  /**
   * Ignore the keydown event if it originates from one of the
   * `ELEMENTS_TO_IGNORE`, unless the user has whitelisted it.
   */
  return (
    ELEMENTS_TO_IGNORE.includes(target.nodeName as ElementsToIgnore) &&
    !ignoredElementWhitelist?.includes(target.nodeName as ElementsToIgnore)
  );
};

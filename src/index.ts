import { useEffect, useMemo } from "react";
import arraysAreEqual from "./helpers/arraysAreEqual";
import getActiveModifierKeys from "./helpers/getActiveModifierKeys";
import getHotkeysArray from "./helpers/getHotkeysArray";
import isSameSet from "./helpers/isSameSet";
import mapModifierKeys from "./helpers/mapModifierKeys";
import modifierKeyPressed from "./helpers/modifierKeyPressed";
import tail from "./helpers/tail";
import takeUntilLast from "./helpers/takeUntilLast";
import ignoreKeydownEvent from "./helpers/ignoreKeydownEvent";
import type { ElementsToIgnore } from "./helpers/ignoreKeydownEvent";

import "./vendor/shim-keyboard-event-key";

interface SequenceTimers {
  [key: number]: number;
}

interface KeySequences {
  [key: number]: string[];
}

interface Options {
  enabled?: boolean;
  enableOnContentEditable?: boolean;
  ignoredElementWhitelist?: ElementsToIgnore[];
  eventListenerOptions?: AddEventListenerOptions;
}

const KEY_SEQUENCE_TIMEOUT = 1000;
const ESCAPE_HATCH_KEY = "*";

const useHotkeys = (
  hotkeys: string | string[],
  callback: (event: KeyboardEvent) => void,
  options?: Options
) => {
  const hotkeysArray: string[][] = useMemo(
    () =>
      Array.isArray(hotkeys)
        ? hotkeys.map(getHotkeysArray)
        : [getHotkeysArray(hotkeys)],
    [hotkeys]
  );

  useEffect(() => {
    const keySequences: KeySequences = {};
    const sequenceTimers: SequenceTimers = {};

    const {
      enabled,
      enableOnContentEditable,
      ignoredElementWhitelist,
      eventListenerOptions,
    } = options || {};

    const clearSequenceTimer = (index: number) => {
      clearTimeout(sequenceTimers[index]);
    };

    const resetKeySequence = (index: number) => {
      clearSequenceTimer(index);
      keySequences[index] = [];
    };

    const handleKeySequence = (
      event: KeyboardEvent,
      keys: string[],
      index: number
    ) => {
      clearSequenceTimer(index);

      keySequences[index] = keySequences[index] || [];
      sequenceTimers[index] = window.setTimeout(() => {
        resetKeySequence(index);
      }, KEY_SEQUENCE_TIMEOUT);

      const keySequence = keySequences[index];
      keySequence.push(event.key.toLowerCase());

      if (arraysAreEqual(keySequence, keys)) {
        resetKeySequence(index);
        callback(event);
      }
    };

    const handleModifierCombo = (event: KeyboardEvent, keys: string[]) => {
      const actionKey: string = tail(keys);
      const modKeys = mapModifierKeys(takeUntilLast(keys));
      const activeModKeys = getActiveModifierKeys(event);
      const allModKeysPressed = isSameSet(modKeys, activeModKeys);

      if (allModKeysPressed && event.key.toLowerCase() === actionKey) {
        callback(event);
      }
    };

    const onKeydown = (event: KeyboardEvent) => {
      if (
        ignoreKeydownEvent(
          event,
          enableOnContentEditable,
          ignoredElementWhitelist
        )
      ) {
        return;
      }

      hotkeysArray.forEach((keysArray, i) => {
        if (keysArray.length === 1 && keysArray[0] === ESCAPE_HATCH_KEY) {
          /**
           * Provide escape hatch should the user want to perform
           * some custom logic not supported by the API.
           */
          callback(event);
          return;
        }

        // Handle modifier key combos
        if (modifierKeyPressed(event)) {
          handleModifierCombo(event, keysArray);
          return;
        }

        // Handle key sequences
        if (keysArray.length > 1 && !modifierKeyPressed(event)) {
          handleKeySequence(event, keysArray, i);
          return;
        }

        // Handle the basic case; a single hotkey
        if (event.key.toLowerCase() === keysArray[0]) {
          callback(event);
        }
      });
    };

    if (enabled !== false) {
      window.addEventListener("keydown", onKeydown, eventListenerOptions);
    }

    return () => {
      window.removeEventListener("keydown", onKeydown, eventListenerOptions);
    };
  }, [
    hotkeysArray,
    callback,
    options?.enabled,
    options?.enableOnContentEditable,
    options?.ignoredElementWhitelist,
    options?.eventListenerOptions,
  ]);
};

export default useHotkeys;

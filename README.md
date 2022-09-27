# react-use-hotkeys

React hook for creating simple keyboard shortcuts.

[![Coverage Status](https://coveralls.io/repos/github/reecelucas/react-use-hotkeys/badge.svg?branch=master)](https://coveralls.io/github/reecelucas/react-use-hotkeys?branch=master)
[![Build Status](https://travis-ci.org/reecelucas/react-use-hotkeys.svg?branch=master)](https://travis-ci.org/reecelucas/react-use-hotkeys)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@reecelucas/react-use-hotkeys.svg)
![npm (scoped)](https://img.shields.io/npm/v/@reecelucas/react-use-hotkeys.svg)
![GitHub](https://img.shields.io/github/license/reecelucas/react-use-hotkeys.svg)

## Installation

```Bash
npm install @reecelucas/react-use-hotkeys
```

## Example Usage

```ts
import useHotkeys from "@reecelucas/react-use-hotkeys";
```

All hotkey combinations must use valid `KeyBoardEvent` `"key"` values. A full list can be found on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) and Wes Bos has created a great [interactive lookup](https://keycode.info/).

```jsx
// Single keys
useHotkeys("Escape", () => {
  console.log("Some action");
});

useHotkeys("F7", () => {
  console.log("Some action");
});

// Modifier combinations
useHotkeys("Meta+Shift+z", () => {
  console.log("Some action");
});

// Key sequences
useHotkeys("w s d", () => {
  console.log("Some action");
});

useHotkeys('w " " d', () => {
  // space key in sequence (`w ' ' d` also works)
  console.log("Some action");
});

// Multiple key combinations mapped to the same callback
useHotkeys(["Control+z", "Meta+z"], () => {
  console.log("Some action");
});

useHotkeys(["a", "Meta+z", "w s d"], () => {
  console.log("Some action");
});
```

The following patterns are **not** supported:

```jsx
// Modifier keys in sequences
useHotkeys("Control i d", () => {
  console.log("I won't run!");
});

// Modifier combinations in sequences
useHotkeys("Control+z i d", () => {
  console.log("I won't run!");
});
```

If you find a use case where the API is too restrictive you can use the escape hatch to perform whatever custom logic you need:

```jsx
useHotkeys("*", (event) => {
  console.log("I will run on every keydown event");

  if (customKeyLogic(event)) {
    console.log("some action");
  }
});
```

## Options

### `enabled`

You can disable the hook by passing `enabled: false`. When disabled the hook will stop listening for `keydown` events:

```jsx
useHotkeys(
  "Escape",
  () => {
    console.log("I won't run!");
  },
  { enabled: false }
);
```

### `enableOnContentEditable`

By default, the hook will ignore `keydown` events originating from elements with the `contenteditable` attribute, since this behaviour is normally what you want. If you want to override this behaviour you can pass `enableOnContentEditable: true`:

```jsx
useHotkeys(
  "Escape",
  () => {
    console.log("Some action");
  },
  { enableOnContentEditable: true }
);
```

### `ignoredElementWhitelist`

By default, the hook will ignore `keydown` events originating from `INPUT` and `TEXTAREA` elements, since this behaviour is normally what you want. If you want to override this behaviour you can use `ignoredElementWhitelist`:

```jsx
useHotkeys(
  "Escape",
  () => {
    console.log("I will now run on input elements");
  },
  { ignoredElementWhitelist: ["INPUT"] }
);

useHotkeys(
  "Escape",
  () => {
    console.log("I will now run on input and textarea elements");
  },
  { ignoredElementWhitelist: ["INPUT", "TEXTAREA"] }
);
```

### `eventListenerOptions`

You can pass [`AddEventListenerOptions`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters) if you need to listen for `keydown` events in the capturing phase:

```jsx
useHotkeys(
  "Escape",
  () => {
    console.log("I will run in the capturing phase");
  },
  {
    eventListenerOptions: {
      capture: true,
    },
  }
);
```

## Call Signature

```ts
useHotkeys(
  hotkeys: string | string[],
  callback: (event: KeyboardEvent) => void,
  options?: {
    enabled?: boolean;
    enableOnContentEditable?: boolean;
    ignoredElementWhitelist?: ("INPUT" | "TEXTAREA")[];
    eventListenerOptions?: AddEventListenerOptions;
  }
) => void;
```

## Tests

Tests use [Jest](https://jestjs.io/) and [react-testing-library](https://github.com/kentcdodds/react-testing-library).

```Bash
git clone git@github.com:reecelucas/react-use-hotkeys.git
cd react-use-hotkeys
yarn
yarn test
```

## LICENSE

[MIT](./LICENSE)

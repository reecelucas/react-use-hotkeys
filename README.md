# react-use-hotkeys

React hook for creating keyboard shortcuts.

## Installation

```Bash
npm install react-use-hotkeys --save
```

## Example Usage

All hotkey combinations must use valid `KeyBoardEvent` `"key"` values. A full list can be found on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) and Wes Bos has created a great [interactive lookup](https://keycode.info/).

```jsx
// Single keys
useHotkeys('Escape', () => {
  console.log('some action');
});

useHotkeys('F7', () => {
  console.log('some action');
});

// Modifier combinations
useHotkeys('Meta+Shift+z', () => {
  console.log('some action');
});

// Key sequences
useHotkeys('w s d', () => {
  console.log('some action');
});
```

The following patterns are **not** supported (yet).

```jsx
// Modifier keys in key sequences
useHotkeys('Control i d', () => {
  console.log("I won't run!");
});

// Modifier combinations in key sequences
useHotkeys('Control+z i d', () => {
  console.log("I won't run!");
});

// Multiple combinations mapped to the same callback
useHotkeys(['Control+z', 'Meta+z'], () => {
  console.log("I won't run!");
});
```

## Call Signature

```ts
useHotkeys(hotkeys: string, callback: (event: KeyboardEvent) => void);
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

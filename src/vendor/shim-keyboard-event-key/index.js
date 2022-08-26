// Vendored version of https://github.com/shvaikalesh/shim-keyboard-event-key.
// Necessary to fix an issue with SSR.
(function() {
  'use strict';

  if (typeof self === 'undefined' || !self.document) return;

  var event = KeyboardEvent.prototype;
  var desc = Object.getOwnPropertyDescriptor(event, 'key');
  if (!desc) return;

  var keys = {
    Win: 'Meta',
    Scroll: 'ScrollLock',
    Spacebar: ' ',

    Down: 'ArrowDown',
    Left: 'ArrowLeft',
    Right: 'ArrowRight',
    Up: 'ArrowUp',

    Del: 'Delete',
    Apps: 'ContextMenu',
    Esc: 'Escape',

    Multiply: '*',
    Add: '+',
    Subtract: '-',
    Decimal: '.',
    Divide: '/'
  };

  Object.defineProperty(event, 'key', {
    get: function() {
      var key = desc.get.call(this);

      return keys.hasOwnProperty(key) ? keys[key] : key;
    }
  });
})();

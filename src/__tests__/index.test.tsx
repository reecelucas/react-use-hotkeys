import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import useHotkeys from '../index';

import fireKeydownEvent from './helpers/fireKeydownEvent';

interface ComponentProps {
  hotkeys: string | string[];
  callback: jest.Mock<any, [any]>;
}

const setup = (
  hotkeys: ComponentProps['hotkeys'],
  callback: ComponentProps['callback']
) => {
  const Component = (props: ComponentProps) => {
    useHotkeys(props.hotkeys, event => {
      props.callback(event);
    });

    return null;
  };

  return render(<Component hotkeys={hotkeys} callback={callback} />);
};

afterEach(cleanup);

describe('useHotkeys: basic', () => {
  test('callback should be called in response to the keydown event', () => {
    const spy = jest.fn();

    setup('z', spy);
    expect(spy).toHaveBeenCalledTimes(0);

    window.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalledTimes(0);

    fireKeydownEvent('z');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('callback should not be called if event.key is not defined and no modifer key is pressed', () => {
    const spy = jest.fn();

    setup('*', spy);

    fireKeydownEvent();
    expect(spy).toHaveBeenCalledTimes(0);

    fireKeydownEvent(undefined, { ctrlKey: true });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('callback should be called with the KeyboardEvent object', () => {
    const spy = jest.fn();

    setup('z', spy);
    const event = new KeyboardEvent('keydown', { key: 'z' });
    window.dispatchEvent(event);
    expect(spy).toHaveBeenCalledWith(event);
  });

  test('z key should fire when pressing z', () => {
    const spy = jest.fn();

    setup('z', spy);
    fireKeydownEvent('z');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('z key should not fire when pressing y', () => {
    const spy = jest.fn();

    setup('z', spy);
    fireKeydownEvent('y');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('space key should fire when pressing space', () => {
    const spy = jest.fn();

    setup(' ', spy);
    fireKeydownEvent(' ');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('hotkeys should not be case sensitive', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();

    setup('escape', spy1);
    fireKeydownEvent('Escape');
    expect(spy1).toHaveBeenCalledTimes(1);

    setup('ConTrol', spy2);
    fireKeydownEvent('Control');
    expect(spy2).toHaveBeenCalledTimes(1);

    setup('Z', spy3);
    fireKeydownEvent('z');
    expect(spy3).toHaveBeenCalledTimes(1);
  });
});

describe('useHotkeys: modifier keys', () => {
  test('modifier+key should fire when pressing modifier+key', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();
    const spy4 = jest.fn();

    setup('Control+z', spy1);
    fireKeydownEvent('z', { ctrlKey: true });
    expect(spy1).toHaveBeenCalledTimes(1);

    setup('Shift+z', spy2);
    fireKeydownEvent('z', { shiftKey: true });
    expect(spy2).toHaveBeenCalledTimes(1);

    setup('Alt+z', spy3);
    fireKeydownEvent('z', { altKey: true });
    expect(spy3).toHaveBeenCalledTimes(1);

    setup('Meta+z', spy4);
    fireKeydownEvent('z', { metaKey: true });
    expect(spy4).toHaveBeenCalledTimes(1);
  });

  test('multiple modifier keys should work', () => {
    const spy = jest.fn();

    setup('Control+Shift+Alt+z', spy);
    fireKeydownEvent('z', { ctrlKey: true, shiftKey: true, altKey: true });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('whitespace between modifier combinations is ignored', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();

    setup('Control + z', spy1);
    fireKeydownEvent('z', { ctrlKey: true });
    expect(spy1).toHaveBeenCalledTimes(1);

    setup(' Meta+ Enter', spy2);
    fireKeydownEvent('Enter', { metaKey: true });
    expect(spy2).toHaveBeenCalledTimes(1);

    setup('Shift  +  z ', spy3);
    fireKeydownEvent('z', { shiftKey: true });
    expect(spy3).toHaveBeenCalledTimes(1);
  });

  test('z should not fire when Control+z is pressed', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();

    setup('z', spy1);
    fireKeydownEvent('z', { ctrlKey: true });
    expect(spy1).toHaveBeenCalledTimes(0);

    setup('Control+z', spy2);
    fireKeydownEvent('z', { ctrlKey: true });
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  test('Control+z should not fire when Control+Shift+z is pressed', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();

    setup('Control+z', spy1);
    fireKeydownEvent('z', { ctrlKey: true, shiftKey: true });
    expect(spy1).toHaveBeenCalledTimes(0);

    setup('Control+z', spy2);
    fireKeydownEvent('z', { ctrlKey: true });
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  test('Meta+Shift+z should not fire when Meta+z is pressed', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();

    setup('Meta+Shift+z', spy1);
    fireKeydownEvent('z', { metaKey: true });
    expect(spy1).toHaveBeenCalledTimes(0);

    setup('Meta+Shift+z', spy2);
    fireKeydownEvent('z', { metaKey: true, shiftKey: true });
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  test('The order in which modifier keys are pressed should not matter', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();

    setup('Shift+Meta+z', spy1);
    fireKeydownEvent('z', { metaKey: true, shiftKey: true });
    expect(spy1).toHaveBeenCalledTimes(1);

    setup('Meta+Shift+z', spy2);
    fireKeydownEvent('z', { metaKey: true, shiftKey: true });
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  test('modifier combinations must end with a key', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();

    setup('Meta+Shift', spy1);
    fireKeydownEvent('', { metaKey: true, shiftKey: true });
    expect(spy1).toHaveBeenCalledTimes(0);

    setup('Meta+Shift+z', spy2);
    fireKeydownEvent('z', { metaKey: true, shiftKey: true });
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  test('modifier combinations support the + key', () => {
    const spy = jest.fn();

    setup('Shift++', spy);
    fireKeydownEvent('+', { shiftKey: true });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('useHotkeys: key sequences', () => {
  test('"g i" should fire when "g i" is pressed', () => {
    const spy = jest.fn();

    setup('g i', spy);
    fireKeydownEvent('g');
    fireKeydownEvent('i');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('"g i" should not fire when "i g" is pressed', () => {
    const spy = jest.fn();

    setup('g i', spy);
    fireKeydownEvent('i');
    fireKeydownEvent('g');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('key should not fire when included in sequence', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();

    setup('g i d', spy1);
    fireKeydownEvent('g');
    expect(spy1).toHaveBeenCalledTimes(0);

    setup('g i d', spy2);
    fireKeydownEvent('i');
    expect(spy2).toHaveBeenCalledTimes(0);

    setup('g i d', spy3);
    fireKeydownEvent('d');
    expect(spy3).toHaveBeenCalledTimes(0);
  });

  test('sequences should be space-separated', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();

    setup('gi', spy1);
    fireKeydownEvent('g');
    fireKeydownEvent('i');
    expect(spy1).toHaveBeenCalledTimes(0);

    setup('g i', spy2);
    fireKeydownEvent('g');
    fireKeydownEvent('i');
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  test('extra whitespace in a sequence should be ignored', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();

    setup('g  i  ', spy1);
    fireKeydownEvent('g');
    fireKeydownEvent('i');
    expect(spy1).toHaveBeenCalledTimes(1);

    setup('  g i', spy2);
    fireKeydownEvent('g');
    fireKeydownEvent('i');
    expect(spy2).toHaveBeenCalledTimes(1);

    setup('g   i', spy3);
    fireKeydownEvent('g');
    fireKeydownEvent('i');
    expect(spy3).toHaveBeenCalledTimes(1);
  });

  test('space key should be wrapped in quotation marks', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();

    setup('" " g  i', spy1);
    fireKeydownEvent(' ');
    fireKeydownEvent('g');
    fireKeydownEvent('i');
    expect(spy1).toHaveBeenCalledTimes(1);

    setup(`g ' ' i`, spy2); // tslint:disable-line:quotemark
    fireKeydownEvent('g');
    fireKeydownEvent(' ');
    fireKeydownEvent('i');
    expect(spy2).toHaveBeenCalledTimes(1);

    setup('  g i', spy3);
    fireKeydownEvent(' ');
    fireKeydownEvent('g');
    fireKeydownEvent('i');
    expect(spy3).toHaveBeenCalledTimes(0);
  });

  test('sequences should not fire for sub-sequences', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();
    const spy4 = jest.fn();

    setup('g i d', spy1);
    fireKeydownEvent('g');
    fireKeydownEvent('i');
    expect(spy1).toHaveBeenCalledTimes(0);

    setup('g i d', spy2);
    fireKeydownEvent('i');
    fireKeydownEvent('d');
    expect(spy2).toHaveBeenCalledTimes(0);

    setup('g i d', spy3);
    fireKeydownEvent('g');
    fireKeydownEvent('i');
    fireKeydownEvent('d');
    expect(spy3).toHaveBeenCalledTimes(1);

    setup('h a t', spy4);
    fireKeydownEvent('h');
    fireKeydownEvent('e');
    fireKeydownEvent('a');
    fireKeydownEvent('r');
    fireKeydownEvent('t');
    expect(spy4).toHaveBeenCalledTimes(0);
  });

  test('sequences should not support modifier keys or combos', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();

    setup('Shift i d', spy1);
    fireKeydownEvent('Shift', { shiftKey: true });
    fireKeydownEvent('i');
    fireKeydownEvent('d');
    expect(spy1).toHaveBeenCalledTimes(0);

    setup('g Control+z d', spy2);
    fireKeydownEvent('g');
    fireKeydownEvent('z', { ctrlKey: true });
    fireKeydownEvent('d');
    expect(spy2).toHaveBeenCalledTimes(0);

    setup('Meta+s i d', spy3);
    fireKeydownEvent('s', { metaKey: true });
    fireKeydownEvent('i');
    fireKeydownEvent('d');
    expect(spy3).toHaveBeenCalledTimes(0);
  });

  test('sequence should timeout', () => {
    let timer;

    jest.useFakeTimers();
    const spy = jest.fn();

    setup('g i', spy);
    fireKeydownEvent('g');

    timer = setTimeout(() => {
      clearTimeout(timer);
      fireKeydownEvent('i');
    }, 1000);

    jest.runAllTimers();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('sequence should not timeout', () => {
    jest.useFakeTimers();
    const spy = jest.fn();

    setup('g i d', spy);
    fireKeydownEvent('g');

    setTimeout(() => {
      fireKeydownEvent('i');
    }, 600);

    setTimeout(() => {
      fireKeydownEvent('d');
    }, 900);

    jest.runAllTimers();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('useHotkeys: multiple combinations', () => {
  test('single keys should work', () => {
    const spy = jest.fn();

    setup(['g', 'i', 'd'], spy);

    fireKeydownEvent('g');
    expect(spy).toHaveBeenCalledTimes(1);

    fireKeydownEvent('i');
    expect(spy).toHaveBeenCalledTimes(2);

    fireKeydownEvent('d');
    expect(spy).toHaveBeenCalledTimes(3);
  });

  test('modifier combinations should work', () => {
    const spy = jest.fn();

    setup(['Control+z', 'Meta+z'], spy);

    fireKeydownEvent('z', { ctrlKey: true });
    expect(spy).toHaveBeenCalledTimes(1);

    fireKeydownEvent('z', { metaKey: true });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('key sequences should work', () => {
    jest.useFakeTimers();
    const spy = jest.fn();

    setup(['g i d', 't i f'], spy);

    fireKeydownEvent('g');
    fireKeydownEvent('i');
    fireKeydownEvent('d');
    expect(spy).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      // Wait for previous sequence ('g i d') to timeout
      fireKeydownEvent('t');
      fireKeydownEvent('i');
      fireKeydownEvent('f');
    }, 1000);

    jest.runAllTimers();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('mixed key combinations should work', () => {
    jest.useFakeTimers();
    const spy = jest.fn();

    setup(['g i d', 'Control+z', 'a'], spy);

    fireKeydownEvent('z', { ctrlKey: true });
    expect(spy).toHaveBeenCalledTimes(1);

    fireKeydownEvent('g');
    fireKeydownEvent('i');
    fireKeydownEvent('d');
    expect(spy).toHaveBeenCalledTimes(2);

    setTimeout(() => {
      // Wait for previous sequence ('g i d') to timeout
      fireKeydownEvent('a');
    }, 1000);

    jest.runAllTimers();
    expect(spy).toHaveBeenCalledTimes(3);
  });
});

describe('useHotkeys: escape hatch', () => {
  test('* should fire for all keys', () => {
    const spy = jest.fn();

    setup('*', spy);
    fireKeydownEvent('z');
    fireKeydownEvent(' ');
    fireKeydownEvent(';');
    fireKeydownEvent('', { ctrlKey: true });
    fireKeydownEvent('z', { metaKey: true });
    expect(spy).toHaveBeenCalledTimes(5);
  });
});

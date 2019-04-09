import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import useHotkeys from '../index';
import usePrevious from './utils/hooks/usePrevious';

const Basic = ({ hotkey }: { hotkey: string }) => {
  const [keyPressed, setKeyPressed] = React.useState(false);
  const prevHotkey = usePrevious(hotkey);

  React.useEffect(() => {
    if (hotkey !== prevHotkey) {
      setKeyPressed(false);
    }
  }, [hotkey]);

  useHotkeys(hotkey, event => {
    event.preventDefault();
    setKeyPressed(true);
  });

  return (
    <div>
      <span>Hotkey selected:</span> <strong>{hotkey}</strong>
      <br />
      <span>Hotkey pressed: {keyPressed ? 'TRUE' : 'FALSE'}</span>
    </div>
  );
};

storiesOf('useHotkeys', module)
  .addDecorator(withKnobs)
  .add('Core API', () => <Basic hotkey={text('Hotkeys', 'Escape')} />)
  .add('Escape hatch', () => <Basic hotkey={'*'} />);

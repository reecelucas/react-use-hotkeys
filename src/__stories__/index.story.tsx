import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import useHotkeys from '../index';

const Basic: React.FC<{ hotkey: string }> = ({ hotkey }) => {
  useHotkeys(hotkey, () => {
    alert(`${hotkey} pressed!`);
  });

  return <div>Press {hotkey}</div>;
};

const EventCapture = () => {
  useHotkeys(
    'Escape',
    () => {
      alert('Escape pressed: capturing phase');
    },
    true
  );

  return <Basic hotkey={'Escape'} />;
};

const EscapeHatch = () => {
  useHotkeys('*', (event: KeyboardEvent) => {
    alert(`${event.key} pressed!`);
  });

  return <p>Press any key</p>;
};

storiesOf('useHotkeys', module)
  .addDecorator(withKnobs)
  .add('Basic', () => <Basic hotkey={'Escape'} />)
  .add('Modifier combination', () => <Basic hotkey={'Meta+Shift+z'} />)
  .add('Key sequences', () => <Basic hotkey={'j o b'} />)
  .add('Space in sequence', () => <Basic hotkey={'w " " d'} />)
  .add('Event listener options', () => <EventCapture />)
  .add('Escape hatch', () => <EscapeHatch />);

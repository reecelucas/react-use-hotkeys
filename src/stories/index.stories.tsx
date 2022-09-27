import React from "react";

import useHotkeys from "..";

interface ComponentProps {
  hotkey: string;
  callback?: (event: KeyboardEvent) => void;
}

const Component: React.FC<ComponentProps> = ({ hotkey, callback }) => {
  useHotkeys(hotkey, (event) => {
    if (typeof callback === "function") {
      callback(event);
    } else {
      alert(`${hotkey} pressed!`);
    }
  });

  return <div>Press {hotkey}</div>;
};

export default {
  title: "useHotkeys",
  component: Component,
};

const Template = (args) => <Component {...args} />;

export const SingleHotkey = Template.bind({});

SingleHotkey.args = {
  label: "Single hotkey",
  hotkey: "Escape",
};

export const ModifierCombination = Template.bind({});

ModifierCombination.args = {
  label: "Modifier Combination",
  hotkey: "Meta+Shift+z",
};

export const KeySequences = Template.bind({});

KeySequences.args = {
  label: "Key Sequences",
  hotkey: "a b c",
};

export const SpaceInSequence = Template.bind({});

SpaceInSequence.args = {
  label: "Space in Sequence",
  hotkey: 'a " " c',
};

export const EscapeHatch = Template.bind({});

EscapeHatch.args = {
  label: "Escape Hatch",
  hotkey: "*",
  callback: (event) => {
    alert(`${event.key} pressed!`);
  },
};

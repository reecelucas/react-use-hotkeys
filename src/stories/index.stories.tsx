import React from "react";

import useHotkeys from "../";

interface ComponentProps {
  hotkey: string;
  useEventCapture: boolean;
  callback?: (event: KeyboardEvent) => void;
}

const Component: React.FC<ComponentProps> = ({
  hotkey,
  useEventCapture = false,
  callback,
}) => {
  useHotkeys(
    hotkey,
    (event) => {
      if (typeof callback === "function") {
        callback(event);
      } else {
        alert(`${hotkey} pressed!`);
      }
    },
    useEventCapture
  );

  return <div>Press {hotkey}</div>;
};

export default {
  title: "useHotkeys",
  component: Component,
};

const Template = (args) => <Component {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  label: "Basic",
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

export const UseCapture = Template.bind({});

UseCapture.args = {
  label: "Event Listener Options",
  hotkey: "Enter",
  useEventCapture: true,
  callback: (event) => {
    alert(`${event.key} pressed: capturing phase`);
  },
};

export const EscapeHatch = Template.bind({});

EscapeHatch.args = {
  label: "Escape Hatch",
  hotkey: "*",
  callback: (event) => {
    alert(`${event.key} pressed!`);
  },
};

import { addParameters, configure } from '@storybook/react';

addParameters({
  options: {
    sidebarAnimations: false,
    enableShortcuts: false
  }
});

const req = require.context(
  '../src/',
  true,
  /.*\.(stories|story)\.(js|jsx|ts|tsx)?$/
);

const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);

import { configure, getStorybook, setAddon } from '@storybook/react';
import createPercyAddon from '@percy-io/percy-storybook';
import '../src/app/app.css';
import '../src/app/variables.css';

// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const { percyAddon, serializeStories } = createPercyAddon();

setAddon(percyAddon);

configure(loadStories, module);

serializeStories(getStorybook);

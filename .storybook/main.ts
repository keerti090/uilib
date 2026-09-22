import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../projects/uilib/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/angular',
    options: {
      // 👇 ADD THIS LINE (use the exact name from your angular.json "projects" list)
      projectName: 'storybook-apptium', 
    },
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
import type { StorybookConfig } from '@storybook/angular';
import type { Configuration } from 'webpack';

const isGHPages = process.env['GITHUB_ACTIONS'] === 'true';
const publicPath = isGHPages ? '/uilib/' : '/';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  webpackFinal: async (webpackConfig: Configuration) => {
    webpackConfig.output = {
      ...webpackConfig.output,
      publicPath,
    };
    return webpackConfig;
  },
};

export default config;

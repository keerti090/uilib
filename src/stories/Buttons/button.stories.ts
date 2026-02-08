import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { IconComponent } from '../icon/icon.component';

const meta: Meta<ButtonComponent> = {
  title: 'Example/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [IconComponent],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'toned', 'link'],
    },
    state: {
      control: 'select',
      options: ['default', 'disabled', 'pressed', 'error', 'success', 'loading'],
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
    },
    buttonText: {
      control: 'boolean',
    },
  },
  args: {
    label: 'Button',
    type: 'primary',
    state: 'default',
    size: 'large',
    buttonText: true,
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
  },
  render: (args) => ({
    props: args,
    template: `
      <storybook-button [type]="type" [state]="state" [size]="size" [buttonText]="buttonText" [label]="label">
        <app-icon icon="icon-search" size="sm" leftIconSwap></app-icon>
        <app-icon icon="icon-add" size="sm" rightIconSwap></app-icon>
      </storybook-button>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    state: 'disabled',
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading...',
    state: 'loading',
  },
};

export const Success: Story = {
  args: {
    label: 'Success',
    state: 'success',
  },
};

export const Error: Story = {
  args: {
    label: 'Error',
    state: 'error',
  },
};

export const WithIconsOnly: Story = {
  args: {
    buttonText: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <storybook-button [type]="type" [state]="state" [size]="size" [buttonText]="buttonText">
        <app-icon icon="icon-check" size="sm" leftIconSwap></app-icon>
        <app-icon icon="icon-chevron-right" size="sm" rightIconSwap></app-icon>
      </storybook-button>
    `,
  }),
};

export const NoIcons: Story = {
  args: {
    buttonText: true,
  },
};



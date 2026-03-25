import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AlertComponent } from './alert.component';

const meta: Meta<AlertComponent> = {
  title: 'components/Alert',
  component: AlertComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AlertComponent],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['Information', 'Success', 'Warning', 'Error'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    showIcon: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    dismiss: { action: 'dismissed' },
  },
  args: {
    type: 'Information',
    title: '',
    description: 'Alert description text goes here.',
    showIcon: true,
    dismissible: false,
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Default: Story = {};

export const Information: Story = {
  args: { type: 'Information' },
};

export const Success: Story = {
  args: { type: 'Success' },
};

export const Warning: Story = {
  args: { type: 'Warning' },
};

export const Error: Story = {
  args: { type: 'Error' },
};

export const WithTitle: Story = {
  args: {
    type: 'Information',
    title: 'Alert Title',
    description: 'Additional context or detail about the alert message.',
  },
};

export const Dismissible: Story = {
  args: {
    type: 'Warning',
    title: 'Warning',
    description: 'This alert can be dismissed.',
    dismissible: true,
  },
};

export const NoIcon: Story = {
  args: {
    type: 'Error',
    description: 'This alert has no leading icon.',
    showIcon: false,
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BannerComponent } from './banner.component';

const meta: Meta<BannerComponent> = {
  title: 'components/Banner',
  component: BannerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BannerComponent],
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
    actionLabel: { control: 'text' },
    dismiss: { action: 'dismissed' },
    action: { action: 'action clicked' },
  },
  args: {
    type: 'Information',
    title: '',
    description: 'Banner message goes here.',
    showIcon: true,
    dismissible: false,
    actionLabel: '',
  },
};

export default meta;
type Story = StoryObj<BannerComponent>;

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
    title: 'Banner Title',
    description: 'Additional context or detail about the banner message.',
  },
};

export const Dismissible: Story = {
  args: {
    type: 'Warning',
    title: 'Warning',
    description: 'This banner can be dismissed.',
    dismissible: true,
  },
};

export const WithAction: Story = {
  args: {
    type: 'Information',
    title: 'Action Required',
    description: 'There is something that needs your attention.',
    actionLabel: 'Take Action',
  },
};

export const WithActionAndDismiss: Story = {
  args: {
    type: 'Error',
    title: 'Error Occurred',
    description: 'Something went wrong. Please try again or contact support.',
    actionLabel: 'Retry',
    dismissible: true,
  },
};

export const NoIcon: Story = {
  args: {
    type: 'Success',
    description: 'This banner has no leading icon.',
    showIcon: false,
  },
};

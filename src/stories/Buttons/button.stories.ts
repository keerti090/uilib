import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { IconComponent } from '../icon/icon.component';

const meta: Meta<ButtonComponent> = {
  title: 'components/Button',
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
    showLeftIcon: {
      control: 'boolean',
    },
    showRightIcon: {
      control: 'boolean',
    },
    leftIconName: {
      control: 'text',
    },
    rightIconName: {
      control: 'text',
    },
  },
  args: {
    label: 'Button',
    type: 'primary',
    state: 'default',
    size: 'large',
    buttonText: true,
    showLeftIcon: false,
    showRightIcon: false,
    leftIconName: 'icon-add',
    rightIconName: 'icon-add',
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Button',
    showLeftIcon: true,
    showRightIcon: true,
    leftIconName: 'icon-add',
    rightIconName: 'icon-add',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Button',
    state: 'disabled',
    showLeftIcon: true,
    showRightIcon: true,
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
    showLeftIcon: true,
    showRightIcon: true,
  },
};

export const NoIcons: Story = {
  args: {
    buttonText: true,
    showLeftIcon: false,
    showRightIcon: false,
  },
};

export const OnState: Story = {
  args: {
    label: 'Button',
    showLeftIcon: true,
    showRightIcon: true,
    type: 'primary',
  },
};

export const OffState: Story = {
  args: {
    label: 'Button',
    showLeftIcon: true,
    showRightIcon: true,
    type: 'primary',
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Button',
    size: 'small',
    showLeftIcon: true,
    showRightIcon: true,
  },
};

export const MediumSize: Story = {
  args: {
    label: 'Button',
    size: 'medium',
    showLeftIcon: true,
    showRightIcon: true,
  },
};

export const LargeSize: Story = {
  args: {
    label: 'Button',
    size: 'large',
    showLeftIcon: true,
    showRightIcon: true,
  },
};

export const Toned: Story = {
  args: {
    label: 'Button',
    type: 'toned',
    showLeftIcon: false,
    showRightIcon: true,
  },
};



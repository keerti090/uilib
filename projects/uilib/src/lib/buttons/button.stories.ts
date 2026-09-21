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
    leftIconSet: {
      control: 'select',
      options: ['material', 'asset'],
    },
    rightIconSet: {
      control: 'select',
      options: ['material', 'asset'],
    },
    leftIconSrc: {
      control: 'text',
      description: 'Custom left icon URL (overrides leftIconName/leftIconSet)',
    },
    rightIconSrc: {
      control: 'text',
      description: 'Custom right icon URL (overrides rightIconName/rightIconSet)',
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
    leftIconName: 'add',
    rightIconName: 'add',
    leftIconSet: 'material',
    rightIconSet: 'material',
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Button',
    showLeftIcon: true,
    showRightIcon: true,
    leftIconName: 'add',
    rightIconName: 'add',
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

/** Custom icon from URL: pass any image URL (e.g. CDN, app asset, or data URL). */
export const CustomIconFromUrl: Story = {
  args: {
    label: 'Custom icon',
    showLeftIcon: true,
    leftIconSrc: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/arrow_forward/default/24px.svg',
    showRightIcon: true,
    rightIconSrc: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/arrow_forward/default/24px.svg',
  },
};

/** Asset icons: use SVG files from assets/icons/ (e.g. "my-icon" → assets/icons/my-icon.svg). */
export const AssetIcons: Story = {
  args: {
    label: 'Asset icons',
    showLeftIcon: true,
    leftIconName: 'icon-search',
    leftIconSet: 'asset',
    showRightIcon: true,
    rightIconName: 'icon-add',
    rightIconSet: 'asset',
  },
};



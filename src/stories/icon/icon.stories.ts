import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
  title: 'components/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text' },
    iconSet: {
      control: 'select',
      options: ['material', 'asset'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    alt: { control: 'text' },
  },
  args: {
    icon: 'search',
    iconSet: 'material',
    size: 'md',
    alt: 'Search',
  },
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {};

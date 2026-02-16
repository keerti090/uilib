import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
  title: 'components/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    alt: { control: 'text' },
  },
  args: {
    icon: 'icon-search',
    size: 'md',
    alt: 'Search Icon',
  },
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {};

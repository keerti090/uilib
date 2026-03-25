import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  title: 'components/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AvatarComponent],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['image', 'initials', 'icon', 'placeholder'],
    },
    size: {
      control: 'select',
      options: ['XS', 'S', 'M', 'L', 'XL'],
    },
    color: {
      control: 'select',
      options: ['blue', 'green', 'orange', 'pink', 'purple', 'turquoise', 'yellow', 'default'],
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'offline', 'away', 'busy'],
    },
    src: { control: 'text' },
    alt: { control: 'text' },
    name: { control: 'text' },
    initials: { control: 'text' },
    icon: { control: 'text' },
  },
  args: {
    type: 'placeholder',
    size: 'M',
    color: 'blue',
    status: 'none',
    alt: '',
    name: '',
    initials: '',
    icon: 'person',
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const Default: Story = {};

export const Placeholder: Story = {
  args: {
    type: 'placeholder',
    size: 'M',
    status: 'none',
  },
};

export const Initials: Story = {
  args: {
    type: 'initials',
    size: 'M',
    name: 'John Doe',
    color: 'blue',
  },
};

export const InitialsGreen: Story = {
  args: {
    type: 'initials',
    size: 'M',
    name: 'Sarah K',
    color: 'green',
  },
};

export const InitialsPurple: Story = {
  args: {
    type: 'initials',
    size: 'M',
    name: 'Marcus B',
    color: 'purple',
  },
};

export const WithImage: Story = {
  args: {
    type: 'image',
    size: 'M',
    src: 'https://i.pravatar.cc/100',
    alt: 'User avatar',
  },
};

export const WithIcon: Story = {
  args: {
    type: 'icon',
    size: 'M',
    icon: 'person',
  },
};

export const SizeXS: Story = {
  args: {
    type: 'initials',
    size: 'XS',
    name: 'AB',
    color: 'blue',
  },
};

export const SizeS: Story = {
  args: {
    type: 'initials',
    size: 'S',
    name: 'AB',
    color: 'blue',
  },
};

export const SizeM: Story = {
  args: {
    type: 'initials',
    size: 'M',
    name: 'AB',
    color: 'blue',
  },
};

export const SizeL: Story = {
  args: {
    type: 'initials',
    size: 'L',
    name: 'AB',
    color: 'blue',
  },
};

export const SizeXL: Story = {
  args: {
    type: 'initials',
    size: 'XL',
    name: 'AB',
    color: 'blue',
  },
};

export const StatusOnline: Story = {
  args: {
    type: 'initials',
    size: 'M',
    name: 'John Doe',
    color: 'blue',
    status: 'online',
  },
};

export const StatusOffline: Story = {
  args: {
    type: 'initials',
    size: 'M',
    name: 'John Doe',
    color: 'blue',
    status: 'offline',
  },
};

export const StatusAway: Story = {
  args: {
    type: 'placeholder',
    size: 'M',
    status: 'away',
  },
};

export const StatusBusy: Story = {
  args: {
    type: 'placeholder',
    size: 'M',
    status: 'busy',
  },
};

export const ImageWithOnlineStatus: Story = {
  args: {
    type: 'image',
    size: 'L',
    src: 'https://i.pravatar.cc/100',
    alt: 'User avatar',
    status: 'online',
  },
};

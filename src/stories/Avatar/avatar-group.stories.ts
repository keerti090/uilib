import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AvatarGroupComponent, AvatarGroupItem } from './avatar-group.component';

const sampleItems: AvatarGroupItem[] = [
  { type: 'initials', name: 'Alice Brown',   color: 'blue' },
  { type: 'initials', name: 'John Doe',      color: 'purple' },
  { type: 'initials', name: 'Sarah Kim',     color: 'green' },
  { type: 'initials', name: 'Marcus Bell',   color: 'orange' },
  { type: 'initials', name: 'Nina Torres',   color: 'pink' },
  { type: 'initials', name: 'Leo Wright',    color: 'turquoise' },
  { type: 'initials', name: 'Eva Chen',      color: 'yellow' },
];

const placeholderItems: AvatarGroupItem[] = [
  { type: 'placeholder' },
  { type: 'placeholder' },
  { type: 'placeholder' },
  { type: 'placeholder' },
  { type: 'placeholder' },
  { type: 'placeholder' },
];

const meta: Meta<AvatarGroupComponent> = {
  title: 'components/AvatarGroup',
  component: AvatarGroupComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AvatarGroupComponent],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['stack', 'block'],
    },
    size: {
      control: 'select',
      options: ['XS', 'S', 'M', 'L', 'XL'],
    },
    max: {
      control: 'number',
    },
    items: {
      control: 'object',
    },
  },
  args: {
    variant: 'stack',
    size: 'M',
    max: 5,
    items: sampleItems,
  },
};

export default meta;
type Story = StoryObj<AvatarGroupComponent>;

// ===== Stack Variant =====

export const StackDefault: Story = {
  args: {
    variant: 'stack',
    size: 'M',
    items: sampleItems.slice(0, 4),
  },
};

export const StackWithOverflow: Story = {
  args: {
    variant: 'stack',
    size: 'M',
    max: 4,
    items: sampleItems,
  },
};

export const StackSizeXS: Story = {
  args: {
    variant: 'stack',
    size: 'XS',
    items: sampleItems.slice(0, 5),
  },
};

export const StackSizeS: Story = {
  args: {
    variant: 'stack',
    size: 'S',
    items: sampleItems.slice(0, 5),
  },
};

export const StackSizeL: Story = {
  args: {
    variant: 'stack',
    size: 'L',
    items: sampleItems.slice(0, 5),
  },
};

export const StackSizeXL: Story = {
  args: {
    variant: 'stack',
    size: 'XL',
    items: sampleItems.slice(0, 4),
  },
};

export const StackPlaceholders: Story = {
  args: {
    variant: 'stack',
    size: 'M',
    max: 4,
    items: placeholderItems,
  },
};

// ===== Block Variant =====

export const BlockDefault: Story = {
  args: {
    variant: 'block',
    size: 'M',
    items: sampleItems.slice(0, 4),
  },
};

export const BlockWithOverflow: Story = {
  args: {
    variant: 'block',
    size: 'M',
    max: 4,
    items: sampleItems,
  },
};

export const BlockSizeXS: Story = {
  args: {
    variant: 'block',
    size: 'XS',
    items: sampleItems.slice(0, 5),
  },
};

export const BlockSizeS: Story = {
  args: {
    variant: 'block',
    size: 'S',
    items: sampleItems.slice(0, 5),
  },
};

export const BlockSizeL: Story = {
  args: {
    variant: 'block',
    size: 'L',
    items: sampleItems.slice(0, 5),
  },
};

export const BlockSizeXL: Story = {
  args: {
    variant: 'block',
    size: 'XL',
    items: sampleItems.slice(0, 4),
  },
};

export const BlockMixedTypes: Story = {
  args: {
    variant: 'block',
    size: 'M',
    items: [
      { type: 'image', src: 'https://i.pravatar.cc/100?img=1', alt: 'User 1' },
      { type: 'initials', name: 'John Doe', color: 'blue' },
      { type: 'placeholder' },
      { type: 'initials', name: 'Sarah Kim', color: 'green' },
    ],
  },
};

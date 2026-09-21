import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DescriptionListComponent } from './description-list.component';
import { DescriptionItemComponent } from './description-item.component';

const baseItems = [
  { label: 'Full name', value: 'John Doe' },
  { label: 'Email', value: 'john.doe@example.com' },
  { label: 'Department', value: 'Engineering' },
  { label: 'Location', value: 'San Francisco, CA' },
];

const meta: Meta<DescriptionListComponent> = {
  title: 'components/DescriptionList',
  component: DescriptionListComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DescriptionListComponent, DescriptionItemComponent],
    }),
  ],
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Arrangement of items — vertical stacks them, horizontal places them in a row',
    },
    itemType: {
      control: 'select',
      options: ['Horizontal', 'Vertical', '2Column', 'Display'],
      description: 'Default layout type for each description item',
    },
    size: {
      control: 'select',
      options: ['S', 'M', 'L'],
      description: 'Default size for all items (can be overridden per item)',
    },
    title: { control: 'text' },
    divider: { control: 'boolean' },
  },
  args: {
    items: baseItems,
    layout: 'vertical',
    itemType: 'Horizontal',
    size: 'M',
    title: '',
    divider: false,
  },
};

export default meta;
type Story = StoryObj<DescriptionListComponent>;

// ─── Basic layouts ───────────────────────────────────────────────────────────

export const Default: Story = {};

export const VerticalList: Story = {
  args: { layout: 'vertical', itemType: 'Horizontal' },
};

export const HorizontalList: Story = {
  args: { layout: 'horizontal', itemType: 'Horizontal' },
};

// ─── Item types ──────────────────────────────────────────────────────────────

export const ItemTypeVertical: Story = {
  name: 'Item Type: Vertical',
  args: { layout: 'vertical', itemType: 'Vertical' },
};

export const ItemType2Column: Story = {
  name: 'Item Type: 2 Column',
  args: {
    layout: 'vertical',
    itemType: '2Column',
    items: [
      { label: 'Full name', value: 'John Doe', showPrefixAvatar: true, prefixAvatarLabel: 'JD' },
      { label: 'Email', value: 'john.doe@example.com', showPrefixAvatar: true, prefixAvatarLabel: 'JD' },
      { label: 'Department', value: 'Engineering', showPrefixAvatar: true, prefixAvatarLabel: 'EN' },
    ],
  },
};

export const ItemTypeDisplay: Story = {
  name: 'Item Type: Display',
  args: {
    layout: 'horizontal',
    itemType: 'Display',
    items: [
      { label: 'Total Revenue', value: '$84,200', showPrefixAvatar: true, prefixAvatarLabel: 'TR' },
      { label: 'Active Users', value: '3,412', showPrefixAvatar: true, prefixAvatarLabel: 'AU' },
      { label: 'Open Tickets', value: '27', showPrefixAvatar: true, prefixAvatarLabel: 'OT' },
    ],
  },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  args: { size: 'S', layout: 'vertical', itemType: 'Horizontal' },
};

export const SizeMedium: Story = {
  args: { size: 'M', layout: 'vertical', itemType: 'Horizontal' },
};

export const SizeLarge: Story = {
  args: { size: 'L', layout: 'vertical', itemType: 'Horizontal' },
};

// ─── Icons & badges ──────────────────────────────────────────────────────────

export const WithLabelIcons: Story = {
  name: 'With Label Icons',
  args: {
    layout: 'vertical',
    itemType: 'Horizontal',
    items: [
      { label: 'Full name', value: 'John Doe', showLabelIcon: true, labelIcon: 'person' },
      { label: 'Email', value: 'john.doe@example.com', showLabelIcon: true, labelIcon: 'mail' },
      { label: 'Department', value: 'Engineering', showLabelIcon: true, labelIcon: 'work' },
    ],
  },
};

export const WithContentIcons: Story = {
  name: 'With Content Icons',
  args: {
    layout: 'vertical',
    itemType: 'Horizontal',
    items: [
      { label: 'Profile URL', value: 'john.doe@acme.com', showContentIcon1: true, contentIcon1: 'open_in_new' },
      { label: 'API Key', value: 'sk-*********', showContentIcon2: true, contentIcon2: 'content_copy' },
      { label: 'Repository', value: 'github.com/johndoe', showContentIcon1: true, contentIcon1: 'open_in_new', showContentIcon2: true, contentIcon2: 'content_copy' },
    ],
  },
};

export const WithBadges: Story = {
  name: 'With Badges',
  args: {
    layout: 'vertical',
    itemType: 'Horizontal',
    items: [
      { label: 'Status', value: 'Active', showBadge: true, badgeLabel: 'Active' },
      { label: 'Role', value: 'Admin', showBadge: true, badgeLabel: 'Admin' },
      { label: 'Plan', value: 'Enterprise', showBadge: true, badgeLabel: 'Pro' },
    ],
  },
};

// ─── Divider ─────────────────────────────────────────────────────────────────

export const WithDivider: Story = {
  args: { divider: true, layout: 'vertical', itemType: 'Horizontal' },
};

// ─── Title ───────────────────────────────────────────────────────────────────

export const WithTitle: Story = {
  args: { title: 'Personal Information', layout: 'vertical', itemType: 'Horizontal' },
};

export const WithTitleAndDivider: Story = {
  args: {
    title: 'Contact Details',
    layout: 'vertical',
    itemType: 'Horizontal',
    divider: true,
    size: 'M',
  },
};

// ─── Per-item overrides ──────────────────────────────────────────────────────

export const MixedItemTypes: Story = {
  name: 'Mixed Item Types (per-item override)',
  args: {
    layout: 'vertical',
    itemType: 'Horizontal',
    size: 'M',
    items: [
      { label: 'Name', value: 'John Doe' },
      { label: 'Status', value: 'Active', showBadge: true, badgeLabel: 'Active' },
      { label: 'Bio', value: 'Senior Engineer at Acme Corp', type: 'Vertical' },
      { label: 'Avatar', value: 'JD', type: '2Column', showPrefixAvatar: true, prefixAvatarLabel: 'JD' },
      { label: 'Revenue', value: '$84,200', type: 'Display', size: 'M', showPrefixAvatar: true, prefixAvatarLabel: 'RE' },
    ],
  },
};

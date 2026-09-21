import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SegmentedControlComponent } from './segmented-control.component';
import { SegmentedControlItemComponent } from './segmented-control-item.component';

// --- Segmented Control (Container) ---

const meta: Meta<SegmentedControlComponent> = {
  title: 'components/SegmentedControl',
  component: SegmentedControlComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SegmentedControlComponent, SegmentedControlItemComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['S', 'M', 'L'],
    },
    selectedIndex: { control: 'number' },
    disabled: { control: 'boolean' },
    items: { control: 'object' },
  },
  args: {
    size: 'M',
    selectedIndex: 0,
    disabled: false,
    items: [
      { label: 'Label' },
      { label: 'Label' },
      { label: 'Label' },
    ],
  },
};

export default meta;
type Story = StoryObj<SegmentedControlComponent>;

export const Default: Story = {};

export const SizeS: Story = {
  args: { size: 'S' },
};

export const SizeM: Story = {
  args: { size: 'M' },
};

export const SizeL: Story = {
  args: { size: 'L' },
};

export const FiveItems: Story = {
  args: {
    size: 'M',
    selectedIndex: 2,
    items: [
      { label: 'Label' },
      { label: 'Label' },
      { label: 'Label' },
      { label: 'Label' },
      { label: 'Label' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    size: 'M',
    selectedIndex: 1,
    items: [
      { label: 'Label', icon: 'add' },
      { label: 'Label', icon: 'search' },
      { label: 'Label', icon: 'check' },
    ],
  },
};

export const AllDisabled: Story = {
  args: {
    size: 'M',
    disabled: true,
    selectedIndex: 1,
    items: [
      { label: 'Label' },
      { label: 'Label' },
      { label: 'Label' },
    ],
  },
};

export const PartiallyDisabled: Story = {
  args: {
    size: 'M',
    selectedIndex: 0,
    items: [
      { label: 'Label' },
      { label: 'Label', disabled: true },
      { label: 'Label', disabled: true },
    ],
  },
};

// --- Segmented Control Item (standalone) ---

const itemMeta: Meta<SegmentedControlItemComponent> = {
  title: 'components/SegmentedControl/SegmentItem',
  component: SegmentedControlItemComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SegmentedControlItemComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['S', 'M', 'L'],
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'selected', 'disabled', 'disabled-selected'],
    },
    showIcon: { control: 'boolean' },
    label: { control: 'text' },
    iconName: { control: 'text' },
  },
  args: {
    label: 'Label',
    size: 'M',
    state: 'default',
    showIcon: false,
    iconName: 'add',
  },
};

export { itemMeta };

export const ItemDefault: StoryObj<SegmentedControlItemComponent> = {
  render: (args) => ({ props: args }),
  args: { state: 'default', size: 'M' },
};

export const ItemHover: StoryObj<SegmentedControlItemComponent> = {
  render: (args) => ({ props: args }),
  args: { state: 'hover', size: 'M' },
};

export const ItemSelected: StoryObj<SegmentedControlItemComponent> = {
  render: (args) => ({ props: args }),
  args: { state: 'selected', size: 'M' },
};

export const ItemDisabled: StoryObj<SegmentedControlItemComponent> = {
  render: (args) => ({ props: args }),
  args: { state: 'disabled', size: 'M' },
};

export const ItemDisabledSelected: StoryObj<SegmentedControlItemComponent> = {
  render: (args) => ({ props: args }),
  args: { state: 'disabled-selected', size: 'M' },
};

export const ItemWithIcon: StoryObj<SegmentedControlItemComponent> = {
  render: (args) => ({ props: args }),
  args: { state: 'default', size: 'M', showIcon: true, iconName: 'add' },
};

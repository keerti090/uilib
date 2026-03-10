import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'components/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BadgeComponent],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['Default', 'Error', 'Success', 'Warning', 'Information'],
    },
    badgeStyle: {
      control: 'select',
      options: ['Outlined', 'Toned', 'Highlighted'],
    },
    size: {
      control: 'select',
      options: ['S', 'M', 'L'],
    },
    showPrefixIcon: { control: 'boolean' },
    showSuffixIcon: { control: 'boolean' },
    prefixIcon: { control: 'text' },
    suffixIcon: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    label: 'Label',
    type: 'Default',
    badgeStyle: 'Outlined',
    size: 'M',
    showPrefixIcon: false,
    showSuffixIcon: false,
    prefixIcon: 'add',
    suffixIcon: 'add',
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Default: Story = {};

export const DefaultOutlinedS: Story = {
  args: { type: 'Default', badgeStyle: 'Outlined', size: 'S' },
};

export const DefaultOutlinedM: Story = {
  args: { type: 'Default', badgeStyle: 'Outlined', size: 'M' },
};

export const DefaultOutlinedL: Story = {
  args: { type: 'Default', badgeStyle: 'Outlined', size: 'L' },
};

export const DefaultToned: Story = {
  args: { type: 'Default', badgeStyle: 'Toned', size: 'M' },
};

export const DefaultHighlighted: Story = {
  args: { type: 'Default', badgeStyle: 'Highlighted', size: 'M' },
};

export const ErrorOutlined: Story = {
  args: { type: 'Error', badgeStyle: 'Outlined', size: 'M' },
};

export const ErrorToned: Story = {
  args: { type: 'Error', badgeStyle: 'Toned', size: 'M' },
};

export const ErrorHighlighted: Story = {
  args: { type: 'Error', badgeStyle: 'Highlighted', size: 'M' },
};

export const SuccessOutlined: Story = {
  args: { type: 'Success', badgeStyle: 'Outlined', size: 'M' },
};

export const SuccessToned: Story = {
  args: { type: 'Success', badgeStyle: 'Toned', size: 'M' },
};

export const SuccessHighlighted: Story = {
  args: { type: 'Success', badgeStyle: 'Highlighted', size: 'M' },
};

export const WarningOutlined: Story = {
  args: { type: 'Warning', badgeStyle: 'Outlined', size: 'M' },
};

export const WarningToned: Story = {
  args: { type: 'Warning', badgeStyle: 'Toned', size: 'M' },
};

export const WarningHighlighted: Story = {
  args: { type: 'Warning', badgeStyle: 'Highlighted', size: 'M' },
};

export const InformationOutlined: Story = {
  args: { type: 'Information', badgeStyle: 'Outlined', size: 'M' },
};

export const InformationToned: Story = {
  args: { type: 'Information', badgeStyle: 'Toned', size: 'M' },
};

export const InformationHighlighted: Story = {
  args: { type: 'Information', badgeStyle: 'Highlighted', size: 'M' },
};

export const WithBothIcons: Story = {
  args: {
    type: 'Success',
    badgeStyle: 'Toned',
    size: 'M',
    showPrefixIcon: true,
    showSuffixIcon: true,
    prefixIcon: 'check_circle',
    suffixIcon: 'close',
  },
};

export const WithPrefixIcon: Story = {
  args: {
    type: 'Information',
    badgeStyle: 'Outlined',
    size: 'M',
    showPrefixIcon: true,
    prefixIcon: 'info',
  },
};
